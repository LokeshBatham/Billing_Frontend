import React from 'react'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'

const COLORS = ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1', '#fd7e14']

export default function ReportsCharts({
    dailySalesData,
    monthlySalesData,
    paymentMethodData,
    weeklyTrendData,
    renderTooltip,
}: any) {
    return (
        <>
            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="card themed-card">
                        <div className="card-body">
                            <h6 className="fw-bold">Revenue (Last 7 days)</h6>
                            <div style={{ width: '100%', height: 220 }}>
                                <ResponsiveContainer>
                                    <AreaChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="day" />
                                        <YAxis tickFormatter={(v) => `₹${v}`} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip formatter={renderTooltip} />
                                        <Area type="monotone" dataKey="revenue" stroke="#0d6efd" fillOpacity={1} fill="url(#colorUv)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card themed-card">
                        <div className="card-body">
                            <h6 className="fw-bold">Daily Sales</h6>
                            <div style={{ width: '100%', height: 220 }}>
                                <ResponsiveContainer>
                                    <BarChart data={dailySalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="day" />
                                        <YAxis tickFormatter={(v) => `₹${v}`} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip formatter={renderTooltip} />
                                        <Bar dataKey="sales" fill="#0d6efd" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="card themed-card">
                        <div className="card-body">
                            <h6 className="fw-bold">Monthly Sales</h6>
                            <div style={{ width: '100%', height: 220 }}>
                                <ResponsiveContainer>
                                    <LineChart data={monthlySalesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="month" />
                                        <YAxis tickFormatter={(v) => `₹${v}`} />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip formatter={renderTooltip} />
                                        <Line type="monotone" dataKey="sales" stroke="#198754" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card themed-card">
                        <div className="card-body">
                            <h6 className="fw-bold">Sales by Payment Method</h6>
                            <div style={{ width: '100%', height: 220 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={paymentMethodData} dataKey="value" nameKey="name" outerRadius={80} label>
                                            {paymentMethodData.map((entry: any, index: number) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={renderTooltip} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
