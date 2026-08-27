import os

class Settings:
    PROJECT_NAME: str = "HirePulse AI"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:////tmp/hirepulse.db" if os.getenv("VERCEL") else "sqlite:///./hirepulse.db"
    )
    
    # AI API Keys (Optional - Fallback demo mode available)
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Demo Mode
    DEMO_MODE: bool = True
    DEFAULT_DRIVE_ID: str = "DRIVE-2026-001"

settings = Settings()
