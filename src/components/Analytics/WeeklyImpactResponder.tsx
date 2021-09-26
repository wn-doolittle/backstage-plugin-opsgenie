import React from 'react';
import { InfoCard } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { analyticsApiRef, Context } from '../../analytics';
import { SaveAction } from './SaveAction';
import { colorForString } from './utils';
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export const WeeklyImpactResponders = ({ context }: { context: Context }) => {
    const graphId = "weekly-impact-responders";
    const analyticsApi = useApi(analyticsApiRef);
    const data = analyticsApi.impactByWeekAndResponder(context);

    return (
        <InfoCard title="Average impact by week and responder" action={<SaveAction targetRef={graphId} />}>
            <div id={graphId} style={{ width: '100%', height: 450, paddingTop: '1.2rem', paddingRight: '1.2rem' }}>
                <ResponsiveContainer>
                    <ComposedChart data={data.dataPoints}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="period" />
                        <YAxis tickFormatter={value => value === 0 ? '0 min' : `${value} minutes`} />

                        {data.responders.map(responder => (
                            <Bar dataKey={responder} fill={colorForString(responder)} stackId="a" barSize={30} key={responder} />
                        ))}

                        <Tooltip
                            formatter={(value: number, name: string) => [value === 0 ? '0 min' : `${Math.floor(value)} minutes`, name]}
                        />
                        <Legend />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </InfoCard>
    );
};
