import React, { useState, useEffect } from 'react';
import { analytics, EmailEntry, AnalyticsEvent } from '../services/analytics';
import { X, RefreshCw, Trash2, Download, BarChart2 } from 'lucide-react';
import { questions } from './SurveyPopup';

interface AdminDashboardProps {
    onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
    const [stats, setStats] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'emails' | 'events' | 'survey'>('overview');

    const loadStats = async () => {
        const data = await analytics.getStats();
        setStats(data);
    };

    useEffect(() => {
        loadStats();
        // Auto-refresh every 5 seconds
        const interval = setInterval(loadStats, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleClear = () => {
        if (confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
            analytics.clearData();
            loadStats();
        }
    };

    const downloadCSV = () => {
        if (!stats?.emails.length) return;

        const headers = ['Email', 'Source', 'Timestamp'];
        const rows = stats.emails.map((e: EmailEntry) => [
            e.email,
            e.source,
            new Date(e.timestamp).toLocaleString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers, ...rows].map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "trybe_emails.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!stats) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">

                {/* Header */}
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50">
                    <div>
                        <h2 className="font-serif text-2xl text-charcoal">Analytics Dashboard</h2>
                        <p className="text-xs text-stone-500">Local Data Storage</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={loadStats} className="p-2 hover:bg-stone-200 rounded-full transition-colors" title="Refresh">
                            <RefreshCw size={18} className="text-stone-600" />
                        </button>
                        <button onClick={handleClear} className="p-2 hover:bg-red-100 rounded-full transition-colors" title="Clear Data">
                            <Trash2 size={18} className="text-carmine" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors" title="Close">
                            <X size={18} className="text-stone-600" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-stone-100 px-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-carmine text-carmine' : 'border-transparent text-stone-400 hover:text-charcoal'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('emails')}
                        className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'emails' ? 'border-carmine text-carmine' : 'border-transparent text-stone-400 hover:text-charcoal'}`}
                    >
                        Emails ({stats.totalEmails})
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'events' ? 'border-carmine text-carmine' : 'border-transparent text-stone-400 hover:text-charcoal'}`}
                    >
                        Recent Events
                    </button>
                    <button
                        onClick={() => setActiveTab('survey')}
                        className={`py-4 px-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'survey' ? 'border-carmine text-carmine' : 'border-transparent text-stone-400 hover:text-charcoal'}`}
                    >
                        Survey Results
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-ivory">

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Total Emails</h3>
                                <p className="text-4xl font-serif text-charcoal">{stats.totalEmails}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Total Visitors</h3>
                                <p className="text-4xl font-serif text-charcoal">
                                    {new Set(stats.events.filter((e: any) => e.name === 'page_view').map((e: any) => e.sessionId)).size}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Avg Session</h3>
                                <p className="text-4xl font-serif text-charcoal">
                                    {(() => {
                                        const sessions = stats.events.filter((e: any) => e.name === 'session_end' && e.data?.duration);
                                        if (!sessions.length) return '0s';
                                        const avg = sessions.reduce((acc: number, curr: any) => acc + curr.data.duration, 0) / sessions.length;
                                        return `${Math.round(avg)}s`;
                                    })()}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-2">Total Interactions</h3>
                                <p className="text-4xl font-serif text-charcoal">{stats.totalEvents}</p>
                            </div>

                            <div className="col-span-full mt-4">
                                <h3 className="font-serif text-xl mb-4">Event Breakdown</h3>
                                <div className="space-y-3">
                                    {Object.entries(stats.eventCounts).map(([name, count]: [string, any]) => (
                                        <div key={name} className="flex items-center gap-4">
                                            <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                                                <div
                                                    className="bg-charcoal h-full rounded-full"
                                                    style={{ width: `${(count / stats.totalEvents) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="min-w-[150px] flex justify-between text-sm">
                                                <span className="font-medium text-charcoal">{name}</span>
                                                <span className="text-stone-500">{count}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {Object.keys(stats.eventCounts).length === 0 && (
                                        <p className="text-stone-400 italic text-sm">No events tracked yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* EMAILS TAB */}
                    {activeTab === 'emails' && (
                        <div>
                            <div className="flex justify-end mb-4">
                                <button onClick={downloadCSV} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-carmine hover:bg-carmine/5 px-3 py-2 rounded-lg transition-colors">
                                    <Download size={14} /> Download CSV
                                </button>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                                        <tr>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Source</th>
                                            <th className="p-4">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {stats.emails.map((entry: EmailEntry, i: number) => (
                                            <tr key={i} className="hover:bg-stone-50 transition-colors">
                                                <td className="p-4 font-medium text-charcoal">{entry.email}</td>
                                                <td className="p-4 text-stone-600">{entry.source}</td>
                                                <td className="p-4 text-stone-400 text-xs">{new Date(entry.timestamp).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        {stats.emails.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="p-8 text-center text-stone-400 italic">No emails collected yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* EVENTS TAB */}
                    {activeTab === 'events' && (
                        <div className="space-y-2">
                            {stats.events.map((event: AnalyticsEvent, i: number) => (
                                <div key={i} className="bg-white p-3 rounded-lg border border-stone-100 flex justify-between items-center text-sm">
                                    <div>
                                        <span className="font-bold text-charcoal mr-2">{event.name}</span>
                                        {event.data && (
                                            <span className="text-stone-500 text-xs font-mono">{JSON.stringify(event.data)}</span>
                                        )}
                                    </div>
                                    <span className="text-stone-400 text-xs">{new Date(event.timestamp).toLocaleTimeString()}</span>
                                </div>
                            ))}
                            {stats.events.length === 0 && (
                                <p className="text-center text-stone-400 italic p-8">No recent events.</p>
                            )}
                        </div>
                    )}

                    {/* SURVEY TAB */}
                    {activeTab === 'survey' && (
                        <div className="space-y-6">
                            {(() => {
                                const surveyEvents = stats.events.filter((e: any) => e.name === 'survey_submitted');
                                const totalResponses = surveyEvents.length;

                                if (totalResponses === 0) {
                                    return (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <BarChart2 className="text-stone-400" size={32} />
                                            </div>
                                            <h3 className="text-xl font-serif text-charcoal mb-2">No Survey Responses Yet</h3>
                                            <p className="text-stone-500">Wait for visitors to complete the popup survey.</p>
                                        </div>
                                    );
                                }

                                return (
                                    <>
                                        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-stone-400 text-xs font-bold uppercase tracking-wider mb-1">Total Responses</h3>
                                                <p className="text-3xl font-serif text-charcoal">{totalResponses}</p>
                                            </div>
                                            <div className="w-12 h-12 bg-carmine/10 rounded-full flex items-center justify-center text-carmine">
                                                <BarChart2 size={24} />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {questions.map((q) => {
                                                // Calculate stats for this question
                                                const answers = surveyEvents.map((e: any) => e.data[q.id]).filter((a: any) => a !== undefined);
                                                const avgScore = answers.reduce((a: number, b: number) => a + b, 0) / answers.length || 0;

                                                const distribution = [1, 2, 3, 4, 5].map(score => ({
                                                    score,
                                                    count: answers.filter((a: number) => a === score).length
                                                }));

                                                return (
                                                    <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                                                        <div className="flex justify-between items-start mb-4">
                                                            <h4 className="font-medium text-charcoal text-lg">{q.text}</h4>
                                                            <div className="bg-stone-100 px-3 py-1 rounded-full text-xs font-bold text-stone-600">
                                                                Avg: {avgScore.toFixed(1)}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-2">
                                                            {distribution.map((d) => (
                                                                <div key={d.score} className="flex items-center gap-3 text-sm">
                                                                    <div className="w-8 text-stone-500 font-medium">{d.score}</div>
                                                                    <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                                                                        <div
                                                                            className={`h-full rounded-full ${d.score >= 4 ? 'bg-green-500' : d.score === 3 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                                                            style={{ width: `${(d.count / answers.length) * 100}%` }}
                                                                        ></div>
                                                                    </div>
                                                                    <div className="w-8 text-right text-stone-400">{d.count}</div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between mt-2 text-[10px] text-stone-400 uppercase tracking-wider">
                                                            <span>Strongly Disagree</span>
                                                            <span>Strongly Agree</span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
