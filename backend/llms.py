from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os

load_dotenv()

api = os.getenv("GROQ_API_KEY")

llm = ChatGroq(api_key=api,model="openai/gpt-oss-120b")
print(llm.invoke("Hello!").content)