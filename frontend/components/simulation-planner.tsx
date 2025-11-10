// components/simulation-planner.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bot, Target } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { runWaitTimeSimulation } from "@/lib/api"

export function SimulationPlanner() {
  const [params, setParams] = useState({
    Visit_Day: "Friday",
    Shift: "Evening",
    Triage_Level: "Urgent", // Let's add this missing control
    patient_volume: 40,
    variable_resource: "nurses" as "doctors" | "nurses",
    target_wait_time: 50,
    // NEW: State for the fixed resource
    fixed_doctors: 4,
    fixed_nurses: 8,
  });
  const [simulationResult, setSimulationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const handleRunSimulation = async () => {
    setIsLoading(true); setRecommendation(null); setSimulationResult(null);
    try {
      // Construct the payload for the API
      const simPayload = {
        ...params,
        // For the resource that ISN'T varying, send its fixed value for both min and max
        min_doctors: params.variable_resource === 'nurses' ? params.fixed_doctors : 2,
        max_doctors: params.variable_resource === 'nurses' ? params.fixed_doctors : 8,
        min_nurses: params.variable_resource === 'doctors' ? params.fixed_nurses : 5,
        max_nurses: params.variable_resource === 'doctors' ? params.fixed_nurses : 15,
      };

      const result = await runWaitTimeSimulation(simPayload);
      if (Array.isArray(result)) {
        setSimulationResult(result);
        const optimal = result.find((r: { predicted_wait: number }) => r.predicted_wait <= params.target_wait_time);
        if (optimal) {
          // FIX: The recommendation text now correctly uses the target wait time from the state
          setRecommendation(`To achieve a wait time of ${params.target_wait_time} min or less, you need at least ${optimal.resource_count} ${params.variable_resource}.`);
        } else {
          setRecommendation(`The target wait time of ${params.target_wait_time} min was not met. More ${params.variable_resource} may be needed.`);
        }
      } else { throw new Error("Invalid data format from API."); }
    } catch (error) {
      console.error("Simulation failed:", error);
      setRecommendation("An error occurred during the simulation.");
    } finally { setIsLoading(false); }
  };
  
  const variableResourceLabel = params.variable_resource === 'doctors' ? 'Doctors on Duty' : 'Nurses on Duty';

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* --- CONTROLS PANEL --- */}
      <Card className="lg:col-span-1">
        <CardHeader><CardTitle>Simulation Parameters</CardTitle><CardDescription>Adjust sliders to model different scenarios.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Day</Label><Select value={params.Visit_Day} onValueChange={(val) => setParams(p => ({ ...p, Visit_Day: val }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1"><Label>Shift</Label><Select value={params.Shift} onValueChange={(val) => setParams(p => ({ ...p, Shift: val }))}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Day">Day</SelectItem><SelectItem value="Evening">Evening</SelectItem><SelectItem value="Night">Night</SelectItem></SelectContent></Select></div>
          </div>
          <div className="space-y-2"><Label>Patient Volume for Shift</Label><Slider value={[params.patient_volume]} onValueChange={([val]) => setParams(p => ({ ...p, patient_volume: val }))} min={20} max={150} step={5} /><div className="text-right text-sm text-muted-foreground">{params.patient_volume} patients</div></div>
          <div className="space-y-2"><Label>Target Wait Time (minutes)</Label><Slider value={[params.target_wait_time]} onValueChange={([val]) => setParams(p => ({ ...p, target_wait_time: val }))} min={10} max={90} step={5} /><div className="text-right text-sm text-muted-foreground">{params.target_wait_time} min</div></div>
          
          {/* NEW: Conditional Sliders for Fixed Resources */}
          {params.variable_resource === 'nurses' && (
            <div className="space-y-2 pt-2 border-t"><Label>Fixed # of Doctors</Label><Slider value={[params.fixed_doctors]} onValueChange={([val]) => setParams(p => ({ ...p, fixed_doctors: val }))} min={1} max={10} step={1} /><div className="text-right text-sm text-muted-foreground">{params.fixed_doctors} doctors</div></div>
          )}
          {params.variable_resource === 'doctors' && (
            <div className="space-y-2 pt-2 border-t"><Label>Fixed # of Nurses</Label><Slider value={[params.fixed_nurses]} onValueChange={([val]) => setParams(p => ({ ...p, fixed_nurses: val }))} min={1} max={20} step={1} /><div className="text-right text-sm text-muted-foreground">{params.fixed_nurses} nurses</div></div>
          )}

          <div className="space-y-2 pt-2 border-t"><Label>Resource to Vary</Label><RadioGroup value={params.variable_resource} onValueChange={(val: "doctors" | "nurses") => setParams(p => ({...p, variable_resource: val}))} className="flex gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="doctors" id="doctors" /><Label htmlFor="doctors">Doctors</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="nurses" id="nurses" /><Label htmlFor="nurses">Nurses</Label></div></RadioGroup></div>
          <Button onClick={handleRunSimulation} className="w-full" size="lg" disabled={isLoading}>{isLoading ? "Running Simulation..." : "Run What-If Simulation"}</Button>
        </CardContent>
      </Card>

      {/* --- RESULTS PANEL --- */}
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Simulation Results</CardTitle><CardDescription>Predicted wait time based on the number of {params.variable_resource}.</CardDescription></CardHeader>
        <CardContent>
          {isLoading ? ( <div className="flex h-[400px] items-center justify-center"><p>Calculating...</p></div>
          ) : simulationResult && simulationResult.length > 0 ? (
            <>
              <ChartContainer config={{}} className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  {/* FIX: Added right margin to the chart to prevent label cutoff */}
                  <LineChart data={simulationResult} margin={{ top: 5, right: 40, left: 10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="resource_count" name={variableResourceLabel} type="number" domain={['dataMin', 'dataMax']} label={{ value: variableResourceLabel, position: 'insideBottom', offset: -10 }} />
                    <YAxis name="Predicted Wait" label={{ value: 'Predicted Wait (min)', angle: -90, position: 'insideLeft' }} />
                    <RechartsTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="predicted_wait" name="Predicted Wait" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} />
                    <ReferenceLine y={params.target_wait_time} label={{ value: "Target", position: "right" }} stroke="#ef4444" strokeDasharray="4 4" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              {recommendation && ( <div className="mt-6 flex items-start gap-3 rounded-lg border border-primary/50 bg-primary/5 p-4"><Target className="mt-1 h-5 w-5 flex-shrink-0 text-primary" /><div><h4 className="font-semibold text-primary">Recommendation</h4><p className="text-sm text-muted-foreground">{recommendation}</p></div></div> )}
            </>
          ) : ( <div className="flex h-[400px] flex-col items-center justify-center space-y-3 text-center"><Bot className="h-12 w-12 text-muted-foreground" /><h3 className="font-semibold">Ready to Plan</h3><p className="text-sm text-muted-foreground">Adjust your parameters and run the simulation to see the results.</p></div> )}
        </CardContent>
      </Card>
    </div>
  );
}