from fastapi import FastAPI

app = FastAPI(
    title="ER Management API",
    description="An application to manage emergency room operations efficiently.",
)

@app.get("/")
def read_root():
    return {"Hello": "World"}