from fastapi import FastAPI
from app.api.roles import router as roles_router
from app.api.skills import router as skills_router
from app.api.role_skill_map import router as role_skill_map_router

app = FastAPI(title="Career Intelligence API")

app.include_router(roles_router)
app.include_router(skills_router)
app.include_router(role_skill_map_router)


@app.get("/")
def health_check():
    return {"status": "Backend is running 🚀"}
