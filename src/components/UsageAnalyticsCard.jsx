import {Bar} from 'react-chartjs-2';
import UsageAnalyticsHeader from './UsageAnalyticsHeader';

import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title, 
  Tooltip, 
  Legend
);

const tagsUsageData = {
  labels: ['react', 'design', 'ai', 'tools'],
  datasets: [
    {
      label: 'Tags más usados',
      data: [12, 9, 7, 5],
      backgroundColor: ['#6366F1', '#60A5FA', '#34D399', '#FBBF24'],
    }
  ]
};

const foldersUsageData = {
  labels: ['Work', 'Inspiration', 'Code'],
  datasets: [
    {
      label: 'Carpetas más usadas',
      data: [14, 10, 8],
      backgroundColor: ['#A78BFA', '#F472B6', '#F87171'],
    }
  ]
};


function UsageAnalyticsCard() {
  return (
    <>
      {/* <UsageAnalyticsHeader /> */}
      <div  className="grid md:grid-cols-2 gap-6">
        {/* Primera grafica (Tags mas usados) */}
        <div className="card ">
          <Bar key='tasgChart' data={tagsUsageData}/>


        </div>
        {/* Segunda grafica (Folders mas usados) */}
        <div className="card ">
          <Bar key='folderChart' data={foldersUsageData}/>

        </div>

      </div>

    </>
  )
}

export default UsageAnalyticsCard
