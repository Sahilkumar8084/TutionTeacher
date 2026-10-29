from typing import List,Optional,Literal,Union
from pydantic import BaseModel,Field,ConfigDict,model_validator

CANVAS_W = 800
CANVAS_H  = 400


class DrawItem(BaseModel):
    t: Literal["circle", "line", "text", "dot", "tri"]
    c: str = "black"
    x: Optional[float] = None
    y: Optional[float] = None
    r: Optional[float] = None
    x1: Optional[float] = None
    y1: Optional[float] = None
    x2: Optional[float] = None
    y2: Optional[float] = None
    s: Union[str, float, None] = None  # text ke liye string, tri ke liye size
    size: Optional[float] = None
    fill: Optional[bool] = None
    arrow: Optional[Literal["end", "both"]] = None

class Step(BaseModel):
    title:str
    say:str
    draw:List[DrawItem] = Field(default_factory=list)
    
class ExplainResponse(BaseModel):
    steps: List[Step] = Field(min_length=1)
    
class Message(BaseModel):
    role: Literal["user","assistant"]
    content:str
    
class ExplainRequest(BaseModel):
    question:str
    message:str = ""
    history:List[Message] = Field(default_factory=list)
    

