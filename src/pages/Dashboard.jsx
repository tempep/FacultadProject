import "../scss/layout/_dashboard.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const { byDay, byWeek, byMonth } = useLoaderData();
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Dia", "Semana", "Mes"],
    datasets: [
      {
        label: "# of Votes",
        data: [4, 6, 8],
        backgroundColor: ["red", "yellow", "blue"],
      },
    ],
  };

  return (
    <main className="wrapper_dashboard">
      <div className="container_dashboard">
        <Doughnut
          data={data}
          width={500}
          height={250}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </main>
  );
}
