import { useState } from 'react';
import { Block, Tab, TabList, Title } from '@tremor/react';

import KpiCardGrid from './components/Cards';
import Chart from './components/Chart';
import Table from './components/Table';

export default function Page() {
  const [selectedView, setSelectedView] = useState(1);

  return (
    <main className="bg-slate-50 p-12">
      <Title>Dashboard</Title>
      <TabList
        defaultValue={1}
        handleSelect={(value) => setSelectedView(value)}
        marginTop="mt-6"
      >
        <Tab value={1} text="Overview" />
        <Tab value={2} text="Github Events" />
      </TabList>

      {selectedView === 1 ? (
        <>
          <KpiCardGrid />

          <Block marginTop="mt-6">
            <Chart />
          </Block>
        </>
      ) : (
        <Block marginTop="mt-6">
          <Table username="duyet" />
        </Block>
      )}
    </main>
  );
}
