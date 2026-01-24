from fastapi import FastAPI
from app.api.roles import router as roles_router
from app.api.skills import router as skills_router
from app.api.role_skill_map import router as role_skill_map_router
from app.api.skill_gap import router as skill_gap_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Career Intelligence API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.10:3000",
    ],  # frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(roles_router)
app.include_router(skills_router)
app.include_router(role_skill_map_router)
app.include_router(skill_gap_router)

@app.get("/")
def health_check():
    return {"status": "Backend is running 🚀"}
