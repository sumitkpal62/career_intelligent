from fastapi import FastAPI
from app.api.roles import router as roles_router
from app.api.skills import router as skills_router

app = FastAPI(title="Career Intelligence API")

app.include_router(roles_router)
app.include_router(skills_router)


@app.get("/")
def health_check():
    return {"status": "Backend is running 🚀"}
