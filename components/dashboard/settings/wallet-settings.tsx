"use client"

import type React from "react"

import { useState } from "react"
import { createClientSupabaseClient } from "@/lib/auth-utils"
import { Check, AlertCircle } from "lucide-react"

type WalletSettingsProps = {
  wallets: any[]
  userId: string
  isDarkMode: boolean
}

export default function WalletSettings({ wallets, userId, isDarkMode }: WalletSettingsProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [walletName, setWalletName] = useState("")
  const [blockchain, setBlockchain] = useState("ethereum")
  const [isPrimary, setIsPrimary] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClientSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Wallet-Adresse validieren
      if (!isValidWalletAddress(walletAddress, blockchain)) {
        throw new Error("Ungültige Wallet-Adresse für die ausgewählte Blockchain")
      }

      // Prüfen, ob die Wallet-Adresse bereits existiert
      const { data: existingWallet } = await supabase
        .from("user_wallets")
        .select("id")
        .eq("user_id", userId)
        .eq("wallet_address", walletAddress)
        .eq("blockchain", blockchain)
        .single()

      if (existingWallet) {
        throw new Error("Diese Wallet-Adresse ist bereits mit deinem Konto verknüpft")
      }

      // Wenn dies die erste Wallet ist oder als primär markiert wurde, alle anderen Wallets auf nicht-primär setzen
      if (isPrimary || wallets.length === 0) {
        await supabase.from("user_wallets").update({ is_primary: false }).eq("user_id", userId)
      }

      // Neue Wallet erstellen
      const { error: createError } = await supabase.from("user_wallets").insert({
        user_id: userId,
        wallet_address: walletAddress,
        wallet_name: walletName || `${blockchain.charAt(0).toUpperCase() + blockchain.slice(1)} Wallet`,
        blockchain,
        is_primary: isPrimary || wallets.length === 0, // Erste Wallet ist automatisch primär
        balance_snapshot: {},
        last_updated: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })

      if (createError) {
        throw createError
      }

      setSuccess(true)

      // Formular zurücksetzen
      setWalletAddress("")
      setWalletName("")
      setBlockchain("ethereum")
      setIsPrimary(false)

      // Erfolgsbenachrichtigung nach 3 Sekunden ausblenden
      setTimeout(() => {
        setSuccess(false)
      }, 3000)

      // Seite neu laden, um die neue Wallet anzuzeigen
      window.location.reload()
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  // Wallet-Adresse löschen
  const deleteWallet = async (walletId: string) => {
    if (!confirm("Bist du sicher, dass du diese Wallet entfernen möchtest?")) {
      return
    }

    try {
      const { error } = await supabase.from("user_wallets").delete().eq("id", walletId).eq("user_id", userId)

      if (error) {
        throw error
      }

      // Seite neu laden, um die gelöschte Wallet zu entfernen
      window.location.reload()
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.")
    }
  }

  // Wallet als primär markieren
  const setPrimaryWallet = async (walletId: string) => {
    try {
      // Alle Wallets auf nicht-primär setzen
      await supabase.from("user_wallets").update({ is_primary: false }).eq("user_id", userId)

      // Ausgewählte Wallet als primär markieren
      const { error } = await supabase
        .from("user_wallets")
        .update({ is_primary: true })
        .eq("id", walletId)
        .eq("user_id", userId)

      if (error) {
        throw error
      }

      // Seite neu laden, um die Änderungen anzuzeigen
      window.location.reload()
    } catch (err: any) {
      setError(err.message || "Ein Fehler ist aufgetreten. Bitte versuche es erneut.")
    }
  }

  // Wallet-Adresse validieren
  const isValidWalletAddress = (address: string, chain: string): boolean => {
    if (!address) return false

    // Einfache Validierung basierend auf der Blockchain
    switch (chain) {
      case "ethereum":
      case "bsc":
      case "polygon":
        return /^0x[a-fA-F0-9]{40}$/.test(address)
      case "solana":
        return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)
      case "bitcoin":
        return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(address)
      default:
        return false
    }
  }

  // Explorer-URL für die Wallet-Adresse
  const getExplorerUrl = (address: string, chain: string): string => {
    switch (chain) {
      case "ethereum":
        return `https://etherscan.io/address/${address}`
      case "bsc":
        return `https://bscscan.com/address/${address}`
      case "polygon":
        return `https://polygonscan.com/address/${address}`
      case "solana":
        return `https://solscan.io/account/${address}`
      case "bitcoin":
        return `https://www.blockchain.com/explorer/addresses/btc/${address}`
      default:
        return "#"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Wallets</h3>
        <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Verwalte deine verbundenen Wallets</p>
      </div>

      {error && (
        <div
          className={`p-4 rounded-lg ${
            isDarkMode
              ? "bg-red-900/20 border border-red-900 text-red-400"
              : "bg-red-50 border border-red-200 text-red-600"
          }`}
        >
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div
          className={`p-4 rounded-lg ${
            isDarkMode
              ? "bg-green-900/20 border border-green-900 text-green-400"
              : "bg-green-50 border border-green-200 text-green-600"
          }`}
        >
          <div className="flex items-start">
            <Check className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>Deine Wallet wurde erfolgreich hinzugefügt</p>
          </div>
        </div>
      )}

      {/* Verbundene Wallets */}
      <div>
        <h4 className="text-sm font-medium mb-3">Verbundene Wallets</h4>

        {wallets.length > 0 ? (
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className={`p-4 rounded-lg border ${
                  isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        wallet.blockchain === "ethereum"
                          ? "bg-blue-500"
                          : wallet.blockchain === "bsc"
                            ? "bg-yellow-500"
                            : wallet.blockchain === "polygon"
                              ? "bg-purple-500"
                              : wallet.blockchain === "solana"
                                ? "bg-green-500"
                                : wallet.blockchain === "bitcoin"
                                  ? "bg-orange-500"
                                  : "bg-gray-500"
                      }`}
                    >
                      {wallet.wallet_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{wallet.wallet_name}</p>
                      <a
                        href={getExplorerUrl(wallet.wallet_address, wallet.blockchain)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm ${isDarkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-600 hover:text-gray-500"}`}
                      >
                        {wallet.wallet_address.substring(0, 6)}...
                        {wallet.wallet_address.substring(wallet.wallet_address.length - 4)}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!wallet.is_primary && (
                      <button
                        onClick={() => setPrimaryWallet(wallet.id)}
                        className={`text-sm px-3 py-1 rounded-full ${
                          isDarkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        Als primär festlegen
                      </button>
                    )}
                    <button
                      onClick={() => deleteWallet(wallet.id)}
                      className={`text-sm px-3 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-red-700 hover:bg-red-600 text-gray-300"
                          : "bg-red-200 hover:bg-red-300 text-red-700"
                      }`}
                    >
                      Entfernen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Noch keine Wallets verbunden.</p>
        )}
      </div>

      {/* Wallet hinzufügen */}
      <div>
        <h4 className="text-sm font-medium mb-3">Wallet hinzufügen</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="walletAddress" className="block text-sm font-medium">
              Wallet-Adresse
            </label>
            <input
              type="text"
              id="walletAddress"
              className={`mt-1 block w-full rounded-md shadow-sm text-black
                ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="walletName" className="block text-sm font-medium">
              Wallet Name (optional)
            </label>
            <input
              type="text"
              id="walletName"
              className={`mt-1 block w-full rounded-md shadow-sm text-black
                ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              value={walletName}
              onChange={(e) => setWalletName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="blockchain" className="block text-sm font-medium">
              Blockchain
            </label>
            <select
              id="blockchain"
              className={`mt-1 block w-full rounded-md shadow-sm text-black
                ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                }`}
              value={blockchain}
              onChange={(e) => setBlockchain(e.target.value)}
            >
              <option value="ethereum">Ethereum</option>
              <option value="bsc">Binance Smart Chain</option>
              <option value="polygon">Polygon</option>
              <option value="solana">Solana</option>
              <option value="bitcoin">Bitcoin</option>
            </select>
          </div>

          <div>
            <label htmlFor="isPrimary" className="flex items-center">
              <input
                id="isPrimary"
                type="checkbox"
                className={`h-4 w-4 rounded text-blue-600 focus:ring-blue-500 ${
                  isDarkMode ? "bg-gray-700 border-gray-600" : "border-gray-300"
                }`}
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
              />
              <span className="ml-2 text-sm font-medium">Als primäre Wallet festlegen</span>
            </label>
          </div>

          <button
            type="submit"
            className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${isDarkMode ? "bg-blue-700 hover:bg-blue-600 text-white" : "bg-blue-500 hover:bg-blue-400 text-white"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Hinzufügen...
              </>
            ) : (
              "Wallet hinzufügen"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
