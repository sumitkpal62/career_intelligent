from fastapi import FastAPI

app = FastAPI(title="Career Intelligence API")


@app.get("/")
def health_check():
    return {"status": "Backend is running 🚀"}
