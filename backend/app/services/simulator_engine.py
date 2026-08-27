from app.models.schemas import SimulationInput, SimulationResponse, ScenarioResult

class SimulatorEngine:
    @staticmethod
    def run_simulation(input_data: SimulationInput) -> SimulationResponse:
        # Baseline (Current Scenario)
        base_tech = 2
        base_hr = 4
        base_mgr = 3
        base_tech_dur = 22.5
        
        baseline = ScenarioResult(
            avg_waiting_time_mins=75.0,
            max_queue_length=72,
            total_process_duration_hours=6.0,
            candidate_throughput_per_hour=42.5,
            predicted_dropout_rate_pct=24.5,
            candidate_satisfaction_score=3.6
        )

        # Capacity math for Technical Round bottleneck
        # Technical throughput capacity per hour = (tech_interviewers * 60) / avg_tech_duration_mins
        base_capacity = (base_tech * 60.0) / base_tech_dur # ~5.33 candidates per hour per interviewer total ~10.66/hr
        sim_capacity = (input_data.tech_interviewers * 60.0) / input_data.avg_tech_duration_mins

        capacity_ratio = sim_capacity / max(0.1, base_capacity)

        # Calculate simulated metrics
        sim_wait = max(15.0, round(75.0 / capacity_ratio, 1))
        sim_max_queue = max(12, int(round(72 / (capacity_ratio ** 0.8))))
        sim_duration = max(3.5, round(6.0 / (capacity_ratio ** 0.5), 1))
        sim_throughput = round(42.5 * min(1.8, capacity_ratio ** 0.6), 1)
        
        # Dropout reduction model based on wait time decrease
        wait_reduction_factor = sim_wait / 75.0
        sim_dropout = max(5.0, round(24.5 * (wait_reduction_factor ** 0.95), 1))
        
        # Satisfaction increase model
        sim_satisfaction = min(4.9, round(3.6 + (1.0 - wait_reduction_factor) * 1.3, 1))

        simulated = ScenarioResult(
            avg_waiting_time_mins=sim_wait,
            max_queue_length=sim_max_queue,
            total_process_duration_hours=sim_duration,
            candidate_throughput_per_hour=sim_throughput,
            predicted_dropout_rate_pct=sim_dropout,
            candidate_satisfaction_score=sim_satisfaction
        )

        delta_wait_pct = round(((sim_wait - 75.0) / 75.0) * 100.0, 1)
        delta_dropout_pct = round(sim_dropout - 24.5, 1)
        delta_duration = round(sim_duration - 6.0, 1)

        return SimulationResponse(
            drive_id=input_data.drive_id,
            current_scenario=baseline,
            simulated_scenario=simulated,
            delta_waiting_time_pct=delta_wait_pct,
            delta_dropout_pct=delta_dropout_pct,
            delta_duration_hours=delta_duration
        )
