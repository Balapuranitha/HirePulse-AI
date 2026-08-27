from fastapi import APIRouter
from app.models.schemas import SimulationInput, SimulationResponse
from app.services.simulator_engine import SimulatorEngine

router = APIRouter(prefix="/simulation", tags=["Simulation"])

@router.post("/run", response_model=SimulationResponse)
def run_recruitment_simulation(sim_in: SimulationInput):
    return SimulatorEngine.run_simulation(sim_in)
