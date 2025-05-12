"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Unterstützte Sprachen
export type Language = "de" | "en" | "es" | "fr" | "zh"

// Sprachkontext-Typ
type DashboardLanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Erstellen des Kontexts mit Standardwerten
const DashboardLanguageContext = createContext<DashboardLanguageContextType>({
  language: "de",
  setLanguage: () => {},
  t: (key) => key,
})

// Hook für den einfachen Zugriff auf den Sprachkontext
export const useDashboardLanguage = () => useContext(DashboardLanguageContext)

// Übersetzungen für das Dashboard
const translations: Record<Language, Record<string, string>> = {
  de: {
    // Allgemein
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Willkommen zurück",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.bots": "Bots",
    "nav.performance": "Performance",
    "nav.transactions": "Transaktionen",
    "nav.alerts": "Benachrichtigungen",
    "nav.settings": "Einstellungen",
    "nav.logout": "Abmelden",

    // Dashboard Widgets
    "widget.performance": "Performance-Übersicht",
    "widget.active_bots": "Aktive Bots",
    "widget.transactions": "Letzte Transaktionen",
    "widget.alerts": "Benachrichtigungen",

    // Performance
    "performance.total_profit": "Gesamtgewinn",
    "performance.average_roi": "Durchschnittliche Rendite",
    "performance.win_rate": "Erfolgsquote",
    "performance.total_transactions": "Transaktionen gesamt",
    "performance.title": "Performance-Metriken",
    "performance.period": "Zeitraum",
    "performance.period.daily": "Täglich",
    "performance.period.weekly": "Wöchentlich",
    "performance.period.monthly": "Monatlich",
    "performance.period.yearly": "Jährlich",
    "performance.period.all": "Gesamt",

    // Bots
    "bots.title": "Trading Bots",
    "bots.create": "Bot erstellen",
    "bots.type": "Bot-Typ",
    "bots.status": "Status",
    "bots.name": "Name",
    "bots.created": "Erstellt am",
    "bots.actions": "Aktionen",
    "bots.status.active": "Aktiv",
    "bots.status.inactive": "Inaktiv",
    "bots.status.error": "Fehler",
    "bots.activate": "Aktivieren",
    "bots.deactivate": "Deaktivieren",
    "bots.delete": "Löschen",
    "bots.edit": "Bearbeiten",
    "bots.view": "Anzeigen",

    // Transaktionen
    "transactions.title": "Transaktionen",
    "transactions.type": "Typ",
    "transactions.token": "Token",
    "transactions.amount": "Betrag",
    "transactions.price": "Preis",
    "transactions.status": "Status",
    "transactions.date": "Datum",
    "transactions.details": "Details",
    "transactions.type.buy": "Kauf",
    "transactions.type.sell": "Verkauf",
    "transactions.filter": "Filtern",
    "transactions.status.completed": "Abgeschlossen",
    "transactions.status.pending": "Ausstehend",
    "transactions.status.failed": "Fehlgeschlagen",

    // Benachrichtigungen
    "alerts.title": "Benachrichtigungen",
    "alerts.create": "Neue Benachrichtigung",
    "alerts.type": "Typ",
    "alerts.condition": "Bedingung",
    "alerts.status": "Status",
    "alerts.created": "Erstellt am",
    "alerts.triggered": "Zuletzt ausgelöst",
    "alerts.actions": "Aktionen",
    "alerts.enable": "Aktivieren",
    "alerts.disable": "Deaktivieren",
    "alerts.delete": "Löschen",
    "alerts.edit": "Bearbeiten",

    // Einstellungen
    "settings.title": "Einstellungen",
    "settings.profile": "Profil",
    "settings.appearance": "Darstellung",
    "settings.notifications": "Benachrichtigungen",
    "settings.wallets": "Wallets",
    "settings.security": "Sicherheit",
    "settings.theme": "Design",
    "settings.theme.light": "Hell",
    "settings.theme.dark": "Dunkel",
    "settings.theme.system": "System",
    "settings.language": "Sprache",
    "settings.save": "Speichern",
    "settings.saved": "Gespeichert!",

    // Profile
    "profile.name": "Name",
    "profile.email": "E-Mail",
    "profile.update": "Aktualisieren",

    // Wallets
    "wallets.title": "Wallets",
    "wallets.add": "Wallet hinzufügen",
    "wallets.address": "Adresse",
    "wallets.name": "Name",
    "wallets.blockchain": "Blockchain",
    "wallets.balance": "Kontostand",
    "wallets.primary": "Primär",
    "wallets.actions": "Aktionen",
    "wallets.make_primary": "Als primär festlegen",
    "wallets.delete": "Löschen",
    "wallets.edit": "Bearbeiten",

    // Auth
    "auth.login": "Anmelden",
    "auth.register": "Registrieren",
    "auth.logout": "Abmelden",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.forgot": "Passwort vergessen?",
    "auth.no_account": "Noch kein Konto?",
    "auth.has_account": "Bereits ein Konto?",

    // Benachrichtigungen
    "notifications.title": "Benachrichtigungen",
    "notifications.empty": "Keine neuen Benachrichtigungen",
    "notifications.view_all": "Alle anzeigen",

    // Erfolgs-/Fehlermeldungen
    "success.saved": "Erfolgreich gespeichert!",
    "success.created": "Erfolgreich erstellt!",
    "success.updated": "Erfolgreich aktualisiert!",
    "success.deleted": "Erfolgreich gelöscht!",
    "error.general": "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
    "error.validation": "Bitte überprüfe deine Eingaben.",
    "error.auth": "Authentifizierungsfehler. Bitte melde dich erneut an.",
  },

  en: {
    // General
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome back",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.bots": "Bots",
    "nav.performance": "Performance",
    "nav.transactions": "Transactions",
    "nav.alerts": "Alerts",
    "nav.settings": "Settings",
    "nav.logout": "Logout",

    // Dashboard Widgets
    "widget.performance": "Performance Overview",
    "widget.active_bots": "Active Bots",
    "widget.transactions": "Recent Transactions",
    "widget.alerts": "Alerts",

    // Performance
    "performance.total_profit": "Total Profit",
    "performance.average_roi": "Average ROI",
    "performance.win_rate": "Win Rate",
    "performance.total_transactions": "Total Transactions",
    "performance.title": "Performance Metrics",
    "performance.period": "Period",
    "performance.period.daily": "Daily",
    "performance.period.weekly": "Weekly",
    "performance.period.monthly": "Monthly",
    "performance.period.yearly": "Yearly",
    "performance.period.all": "All Time",

    // Bots
    "bots.title": "Trading Bots",
    "bots.create": "Create Bot",
    "bots.type": "Bot Type",
    "bots.status": "Status",
    "bots.name": "Name",
    "bots.created": "Created",
    "bots.actions": "Actions",
    "bots.status.active": "Active",
    "bots.status.inactive": "Inactive",
    "bots.status.error": "Error",
    "bots.activate": "Activate",
    "bots.deactivate": "Deactivate",
    "bots.delete": "Delete",
    "bots.edit": "Edit",
    "bots.view": "View",

    // Transactions
    "transactions.title": "Transactions",
    "transactions.type": "Type",
    "transactions.token": "Token",
    "transactions.amount": "Amount",
    "transactions.price": "Price",
    "transactions.status": "Status",
    "transactions.date": "Date",
    "transactions.details": "Details",
    "transactions.type.buy": "Buy",
    "transactions.type.sell": "Sell",
    "transactions.filter": "Filter",
    "transactions.status.completed": "Completed",
    "transactions.status.pending": "Pending",
    "transactions.status.failed": "Failed",

    // Alerts
    "alerts.title": "Alerts",
    "alerts.create": "Create Alert",
    "alerts.type": "Type",
    "alerts.condition": "Condition",
    "alerts.status": "Status",
    "alerts.created": "Created",
    "alerts.triggered": "Last Triggered",
    "alerts.actions": "Actions",
    "alerts.enable": "Enable",
    "alerts.disable": "Disable",
    "alerts.delete": "Delete",
    "alerts.edit": "Edit",

    // Settings
    "settings.title": "Settings",
    "settings.profile": "Profile",
    "settings.appearance": "Appearance",
    "settings.notifications": "Notifications",
    "settings.wallets": "Wallets",
    "settings.security": "Security",
    "settings.theme": "Theme",
    "settings.theme.light": "Light",
    "settings.theme.dark": "Dark",
    "settings.theme.system": "System",
    "settings.language": "Language",
    "settings.save": "Save",
    "settings.saved": "Saved!",

    // Profile
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.update": "Update",

    // Wallets
    "wallets.title": "Wallets",
    "wallets.add": "Add Wallet",
    "wallets.address": "Address",
    "wallets.name": "Name",
    "wallets.blockchain": "Blockchain",
    "wallets.balance": "Balance",
    "wallets.primary": "Primary",
    "wallets.actions": "Actions",
    "wallets.make_primary": "Make Primary",
    "wallets.delete": "Delete",
    "wallets.edit": "Edit",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.logout": "Logout",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.forgot": "Forgot password?",
    "auth.no_account": "Don't have an account?",
    "auth.has_account": "Already have an account?",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.empty": "No new notifications",
    "notifications.view_all": "View all",

    // Success/Error messages
    "success.saved": "Successfully saved!",
    "success.created": "Successfully created!",
    "success.updated": "Successfully updated!",
    "success.deleted": "Successfully deleted!",
    "error.general": "Something went wrong. Please try again.",
    "error.validation": "Please check your inputs.",
    "error.auth": "Authentication error. Please log in again.",
  },

  es: {
    // General
    "dashboard.title": "Panel de Control",
    "dashboard.welcome": "Bienvenido de nuevo",

    // Navigation
    "nav.dashboard": "Panel",
    "nav.bots": "Bots",
    "nav.performance": "Rendimiento",
    "nav.transactions": "Transacciones",
    "nav.alerts": "Alertas",
    "nav.settings": "Ajustes",
    "nav.logout": "Cerrar Sesión",

    // Dashboard Widgets
    "widget.performance": "Resumen de Rendimiento",
    "widget.active_bots": "Bots Activos",
    "widget.transactions": "Transacciones Recientes",
    "widget.alerts": "Alertas",

    // Performance
    "performance.total_profit": "Beneficio Total",
    "performance.average_roi": "ROI Promedio",
    "performance.win_rate": "Tasa de Éxito",
    "performance.total_transactions": "Transacciones Totales",
    "performance.title": "Métricas de Rendimiento",
    "performance.period": "Período",
    "performance.period.daily": "Diario",
    "performance.period.weekly": "Semanal",
    "performance.period.monthly": "Mensual",
    "performance.period.yearly": "Anual",
    "performance.period.all": "Todo el Tiempo",

    // Bots
    "bots.title": "Bots de Trading",
    "bots.create": "Crear Bot",
    "bots.type": "Tipo de Bot",
    "bots.status": "Estado",
    "bots.name": "Nombre",
    "bots.created": "Creado",
    "bots.actions": "Acciones",
    "bots.status.active": "Activo",
    "bots.status.inactive": "Inactivo",
    "bots.status.error": "Error",
    "bots.activate": "Activar",
    "bots.deactivate": "Desactivar",
    "bots.delete": "Eliminar",
    "bots.edit": "Editar",
    "bots.view": "Ver",

    // Transactions
    "transactions.title": "Transacciones",
    "transactions.type": "Tipo",
    "transactions.token": "Token",
    "transactions.amount": "Cantidad",
    "transactions.price": "Precio",
    "transactions.status": "Estado",
    "transactions.date": "Fecha",
    "transactions.details": "Detalles",
    "transactions.type.buy": "Compra",
    "transactions.type.sell": "Venta",
    "transactions.filter": "Filtrar",
    "transactions.status.completed": "Completada",
    "transactions.status.pending": "Pendiente",
    "transactions.status.failed": "Fallida",

    // Alerts
    "alerts.title": "Alertas",
    "alerts.create": "Crear Alerta",
    "alerts.type": "Tipo",
    "alerts.condition": "Condición",
    "alerts.status": "Estado",
    "alerts.created": "Creada",
    "alerts.triggered": "Última Activación",
    "alerts.actions": "Acciones",
    "alerts.enable": "Habilitar",
    "alerts.disable": "Deshabilitar",
    "alerts.delete": "Eliminar",
    "alerts.edit": "Editar",

    // Settings
    "settings.title": "Ajustes",
    "settings.profile": "Perfil",
    "settings.appearance": "Apariencia",
    "settings.notifications": "Notificaciones",
    "settings.wallets": "Carteras",
    "settings.security": "Seguridad",
    "settings.theme": "Tema",
    "settings.theme.light": "Claro",
    "settings.theme.dark": "Oscuro",
    "settings.theme.system": "Sistema",
    "settings.language": "Idioma",
    "settings.save": "Guardar",
    "settings.saved": "¡Guardado!",

    // Profile
    "profile.name": "Nombre",
    "profile.email": "Correo Electrónico",
    "profile.update": "Actualizar",

    // Wallets
    "wallets.title": "Carteras",
    "wallets.add": "Añadir Cartera",
    "wallets.address": "Dirección",
    "wallets.name": "Nombre",
    "wallets.blockchain": "Blockchain",
    "wallets.balance": "Saldo",
    "wallets.primary": "Principal",
    "wallets.actions": "Acciones",
    "wallets.make_primary": "Hacer Principal",
    "wallets.delete": "Eliminar",
    "wallets.edit": "Editar",

    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.register": "Registrarse",
    "auth.logout": "Cerrar Sesión",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.forgot": "¿Olvidaste tu contraseña?",
    "auth.no_account": "¿No tienes una cuenta?",
    "auth.has_account": "¿Ya tienes una cuenta?",

    // Notifications
    "notifications.title": "Notificaciones",
    "notifications.empty": "No hay nuevas notificaciones",
    "notifications.view_all": "Ver todas",

    // Success/Error messages
    "success.saved": "¡Guardado con éxito!",
    "success.created": "¡Creado con éxito!",
    "success.updated": "¡Actualizado con éxito!",
    "success.deleted": "¡Eliminado con éxito!",
    "error.general": "Algo salió mal. Por favor, inténtalo de nuevo.",
    "error.validation": "Por favor, verifica tus entradas.",
    "error.auth": "Error de autenticación. Por favor, inicia sesión de nuevo.",
  },

  fr: {
    // General
    "dashboard.title": "Tableau de Bord",
    "dashboard.welcome": "Bienvenue",

    // Navigation
    "nav.dashboard": "Tableau de Bord",
    "nav.bots": "Bots",
    "nav.performance": "Performance",
    "nav.transactions": "Transactions",
    "nav.alerts": "Alertes",
    "nav.settings": "Paramètres",
    "nav.logout": "Déconnexion",

    // Dashboard Widgets
    "widget.performance": "Aperçu de la Performance",
    "widget.active_bots": "Bots Actifs",
    "widget.transactions": "Transactions Récentes",
    "widget.alerts": "Alertes",

    // Performance
    "performance.total_profit": "Profit Total",
    "performance.average_roi": "ROI Moyen",
    "performance.win_rate": "Taux de Réussite",
    "performance.total_transactions": "Transactions Totales",
    "performance.title": "Métriques de Performance",
    "performance.period": "Période",
    "performance.period.daily": "Quotidien",
    "performance.period.weekly": "Hebdomadaire",
    "performance.period.monthly": "Mensuel",
    "performance.period.yearly": "Annuel",
    "performance.period.all": "Tout",

    // Bots
    "bots.title": "Bots de Trading",
    "bots.create": "Créer un Bot",
    "bots.type": "Type de Bot",
    "bots.status": "Statut",
    "bots.name": "Nom",
    "bots.created": "Créé",
    "bots.actions": "Actions",
    "bots.status.active": "Actif",
    "bots.status.inactive": "Inactif",
    "bots.status.error": "Erreur",
    "bots.activate": "Activer",
    "bots.deactivate": "Désactiver",
    "bots.delete": "Supprimer",
    "bots.edit": "Modifier",
    "bots.view": "Voir",

    // Transactions
    "transactions.title": "Transactions",
    "transactions.type": "Type",
    "transactions.token": "Token",
    "transactions.amount": "Montant",
    "transactions.price": "Prix",
    "transactions.status": "Statut",
    "transactions.date": "Date",
    "transactions.details": "Détails",
    "transactions.type.buy": "Achat",
    "transactions.type.sell": "Vente",
    "transactions.filter": "Filtrer",
    "transactions.status.completed": "Terminée",
    "transactions.status.pending": "En Attente",
    "transactions.status.failed": "Échouée",

    // Alerts
    "alerts.title": "Alertes",
    "alerts.create": "Créer une Alerte",
    "alerts.type": "Type",
    "alerts.condition": "Condition",
    "alerts.status": "Statut",
    "alerts.created": "Créée",
    "alerts.triggered": "Dernière Activation",
    "alerts.actions": "Actions",
    "alerts.enable": "Activer",
    "alerts.disable": "Désactiver",
    "alerts.delete": "Supprimer",
    "alerts.edit": "Modifier",

    // Settings
    "settings.title": "Paramètres",
    "settings.profile": "Profil",
    "settings.appearance": "Apparence",
    "settings.notifications": "Notifications",
    "settings.wallets": "Portefeuilles",
    "settings.security": "Sécurité",
    "settings.theme": "Thème",
    "settings.theme.light": "Clair",
    "settings.theme.dark": "Sombre",
    "settings.theme.system": "Système",
    "settings.language": "Langue",
    "settings.save": "Enregistrer",
    "settings.saved": "Enregistré!",

    // Profile
    "profile.name": "Nom",
    "profile.email": "Email",
    "profile.update": "Mettre à jour",

    // Wallets
    "wallets.title": "Portefeuilles",
    "wallets.add": "Ajouter un Portefeuille",
    "wallets.address": "Adresse",
    "wallets.name": "Nom",
    "wallets.blockchain": "Blockchain",
    "wallets.balance": "Solde",
    "wallets.primary": "Principal",
    "wallets.actions": "Actions",
    "wallets.make_primary": "Définir comme Principal",
    "wallets.delete": "Supprimer",
    "wallets.edit": "Modifier",

    // Auth
    "auth.login": "Connexion",
    "auth.register": "S'inscrire",
    "auth.logout": "Déconnexion",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.forgot": "Mot de passe oublié?",
    "auth.no_account": "Pas encore de compte?",
    "auth.has_account": "Déjà un compte?",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.empty": "Aucune nouvelle notification",
    "notifications.view_all": "Voir tout",

    // Success/Error messages
    "success.saved": "Enregistré avec succès!",
    "success.created": "Créé avec succès!",
    "success.updated": "Mis à jour avec succès!",
    "success.deleted": "Supprimé avec succès!",
    "error.general": "Une erreur est survenue. Veuillez réessayer.",
    "error.validation": "Veuillez vérifier vos entrées.",
    "error.auth": "Erreur d'authentification. Veuillez vous reconnecter.",
  },

  zh: {
    // General
    "dashboard.title": "仪表板",
    "dashboard.welcome": "欢迎回来",

    // Navigation
    "nav.dashboard": "仪表板",
    "nav.bots": "机器人",
    "nav.performance": "性能",
    "nav.transactions": "交易",
    "nav.alerts": "警报",
    "nav.settings": "设置",
    "nav.logout": "退出登录",

    // Dashboard Widgets
    "widget.performance": "性能概览",
    "widget.active_bots": "活跃机器人",
    "widget.transactions": "最近交易",
    "widget.alerts": "警报",

    // Performance
    "performance.total_profit": "总利润",
    "performance.average_roi": "平均投资回报率",
    "performance.win_rate": "成功率",
    "performance.total_transactions": "总交易数",
    "performance.title": "性能指标",
    "performance.period": "周期",
    "performance.period.daily": "每日",
    "performance.period.weekly": "每周",
    "performance.period.monthly": "每月",
    "performance.period.yearly": "每年",
    "performance.period.all": "所有时间",

    // Bots
    "bots.title": "交易机器人",
    "bots.create": "创建机器人",
    "bots.type": "机器人类型",
    "bots.status": "状态",
    "bots.name": "名称",
    "bots.created": "创建时间",
    "bots.actions": "操作",
    "bots.status.active": "活跃",
    "bots.status.inactive": "非活跃",
    "bots.status.error": "错误",
    "bots.activate": "激活",
    "bots.deactivate": "停用",
    "bots.delete": "删除",
    "bots.edit": "编辑",
    "bots.view": "查看",

    // Transactions
    "transactions.title": "交易",
    "transactions.type": "类型",
    "transactions.token": "代币",
    "transactions.amount": "金额",
    "transactions.price": "价格",
    "transactions.status": "状态",
    "transactions.date": "日期",
    "transactions.details": "详情",
    "transactions.type.buy": "买入",
    "transactions.type.sell": "卖出",
    "transactions.filter": "筛选",
    "transactions.status.completed": "已完成",
    "transactions.status.pending": "待处理",
    "transactions.status.failed": "失败",

    // Alerts
    "alerts.title": "警报",
    "alerts.create": "创建警报",
    "alerts.type": "类型",
    "alerts.condition": "条件",
    "alerts.status": "状态",
    "alerts.created": "创建时间",
    "alerts.triggered": "最后触发",
    "alerts.actions": "操作",
    "alerts.enable": "启用",
    "alerts.disable": "禁用",
    "alerts.delete": "删除",
    "alerts.edit": "编辑",

    // Settings
    "settings.title": "设置",
    "settings.profile": "个人资料",
    "settings.appearance": "外观",
    "settings.notifications": "通知",
    "settings.wallets": "钱包",
    "settings.security": "安全",
    "settings.theme": "主题",
    "settings.theme.light": "浅色",
    "settings.theme.dark": "深色",
    "settings.theme.system": "系统",
    "settings.language": "语言",
    "settings.save": "保存",
    "settings.saved": "已保存！",

    // Profile
    "profile.name": "姓名",
    "profile.email": "电子邮件",
    "profile.update": "更新",

    // Wallets
    "wallets.title": "钱包",
    "wallets.add": "添加钱包",
    "wallets.address": "地址",
    "wallets.name": "名称",
    "wallets.blockchain": "区块链",
    "wallets.balance": "余额",
    "wallets.primary": "主要",
    "wallets.actions": "操作",
    "wallets.make_primary": "设为主要",
    "wallets.delete": "删除",
    "wallets.edit": "编辑",

    // Auth
    "auth.login": "登录",
    "auth.register": "注册",
    "auth.logout": "退出登录",
    "auth.email": "电子邮件",
    "auth.password": "密码",
    "auth.forgot": "忘记密码？",
    "auth.no_account": "没有账户？",
    "auth.has_account": "已有账户？",

    // Notifications
    "notifications.title": "通知",
    "notifications.empty": "没有新通知",
    "notifications.view_all": "查看全部",

    // Success/Error messages
    "success.saved": "保存成功！",
    "success.created": "创建成功！",
    "success.updated": "更新成功！",
    "success.deleted": "删除成功！",
    "error.general": "出现问题。请重试。",
    "error.validation": "请检查您的输入。",
    "error.auth": "认证错误。请重新登录。",
  },
}

// Provider-Komponente
export function DashboardLanguageProvider({ children }: { children: ReactNode }) {
  // Standardsprache ist Deutsch, aber wir versuchen, die gespeicherte Sprache zu laden
  const [language, setLanguageState] = useState<Language>("de")

  // Beim ersten Laden die gespeicherte Sprache abrufen
  useEffect(() => {
    const savedLanguage = localStorage.getItem("dashboard_language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Versuche, eine gespeicherte Language aus dem Hauptkontext zu nutzen
      const mainLanguage = localStorage.getItem("language") as Language
      if (mainLanguage && Object.keys(translations).includes(mainLanguage)) {
        setLanguageState(mainLanguage)
      } else {
        // Versuche, die Browsersprache zu erkennen
        const browserLang = navigator.language.split("-")[0] as Language
        if (Object.keys(translations).includes(browserLang)) {
          setLanguageState(browserLang)
        }
      }
    }
  }, [])

  // Sprache ändern und speichern
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("dashboard_language", newLanguage)
  }

  // Übersetzungsfunktion
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <DashboardLanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </DashboardLanguageContext.Provider>
  )
}
