import { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import carbonContext from "./context/carbonContext";
import axios from "axios"
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

function App() {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const [AITips, setAITips] = useState("");
  const { setDistance, setTransportType, distance, setCarbonFootprint, carbonFootprint, transportType } = useContext(carbonContext);

  const onSubmit = async (data) => {
    console.log("data" ,data);
    const res = await axios.post(`${import.meta.env.VITE_FRONT_URL}/calculate`, {
      distance: parseFloat(data.distance),
      transportType: data.transportType
    });

    if (res.data?.success) {
      setDistance(res.data.data.distance);
      setTransportType(res.data.data.transportType);
      setCarbonFootprint(res.data.data.carbonFootprint);
    }

    reset();
  };

  const FetchAPI = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_FRONT_URL}/claude`, {
        distance,
        transportType
      });
      if (response) {
        setAITips(response.data);
      }
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setAITips("Unable to fetch recommendations at the moment.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-cyan-950 to-black p-6">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800">Travel Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
  {...register("distance", { 
    required: "Distance is required", 
    pattern: {
      value: /^[0-9]+(\.[0-9]+)?$/, 
      message: "Please enter a valid number"
    }
  })} 
  placeholder="Distance (km)" 
  className="focus:ring-gray-500 focus:border-gray-500"
/>
{errors.distance && <p className="text-red-500 text-sm">{errors.distance.message}</p>}
            
            <Select onValueChange={(value) => setValue("transportType", value)}>
              <SelectTrigger className="focus:ring-gray-500 focus:border-gray-500">
                <SelectValue placeholder="Select Transport Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="car">Car</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Train</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700">
              Calculate
            </Button>
          </form>

          {carbonFootprint !== null && (
            <div className="mt-6 text-center">
              <h2 className="text-lg font-semibold text-gray-700">Carbon Footprint: {carbonFootprint} kg CO2</h2>
              <Button onClick={FetchAPI} className="mt-4 bg-gray-800 hover:bg-gray-700">
                AI Tips
              </Button>
              <p className="mt-2 text-gray-600">{AITips}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;