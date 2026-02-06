from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.roles import router as roles_router
from app.api.skills import router as skills_router
from app.api.role_skill_map import router as role_skill_map_router
from app.api.skill_gap import router as skill_gap_router
from app.api.progress import router as progress_router
from app.api.auth import router as auth_router
from app.core.config import settings

from app.db.database import engine
from app.db.models import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create table
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(title="Career Intelligence API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roles_router)
app.include_router(skills_router)
app.include_router(role_skill_map_router)
app.include_router(skill_gap_router)
app.include_router(progress_router)
app.include_router(auth_router)

@app.get("/")
def health_check():
    return {"status": "Backend is running 🚀"}
