import React, { useState } from 'react';
import { Plus, Users, ChevronRight, Wallet, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useMeetings, formatAmount, formatDate, getTotalExpense } from '../store/meetingContext';
import { AddMeetingModal } from './AddMeetingModal';
import { Meeting } from '../store/meetingContext';

export function HomePage() {
  const navigate = useNavigate();
  const { meetings, addMeeting } = useMeetings();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (meeting: Meeting) => {
    addMeeting(meeting);
    setShowAddModal(false);
    navigate(`/meeting/${meeting.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 px-5 pt-12 pb-4 bg-white border-b border-gray-100">
        <div className="max-w-[430px] mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">우리의 추억</p>
            <h1 className="text-xl" style={{ fontWeight: 700, color: '#1A1A1A' }}>Together</h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-white text-sm active:scale-95 transition-transform"
            style={{ backgroundColor: '#0066FF', fontWeight: 600 }}
          >
            <Plus className="w-4 h-4" />
            새 모임
          </button>
        </div>
      </div>

      <div className="max-w-[430px] mx-auto px-4 py-4">
        {/* Stats banner */}
        {meetings.length > 0 && (
          <div className="mb-6">
            <div className="bg-white rounded-2xl px-4 h-[60px] border border-gray-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: '#DBEAFE' }}>
                <CalendarDays className="w-5 h-5" style={{ color: '#0066FF' }} />
              </div>
              <p className="text-xs text-gray-400 flex-1">총 모임</p>
              <p className="text-2xl" style={{ fontWeight: 700, color: '#1A1A1A' }}>{meetings.length}</p>
            </div>
          </div>
        )}

        {/* Meeting List */}
        {meetings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-gray-500 mb-2" style={{ fontWeight: 500 }}>아직 기록된 모임이 없어요</p>
            <p className="text-sm text-gray-400 mb-6">친구들과의 소중한 추억을 기록해보세요!</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-white"
              style={{ backgroundColor: '#0066FF', fontWeight: 600 }}
            >
              <Plus className="w-4 h-4" />
              첫 모임 만들기
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {meetings.map((meeting, index) => {
              const total = getTotalExpense(meeting.expenses);
              return (
                <button
                  key={meeting.id}
                  onClick={() => navigate(`/meeting/${meeting.id}`)}
                  className={`w-full flex items-center gap-4 px-4 py-4 active:bg-gray-50 transition-colors text-left ${index !== meetings.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={meeting.coverImage}
                      alt={meeting.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm truncate" style={{ fontWeight: 600, color: '#1A1A1A' }}>{meeting.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(meeting.date)}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {/* Participants */}
                      <div className="flex -space-x-1.5">
                        {meeting.participants.slice(0, 4).map(p => (
                          <div
                            key={p.id}
                            className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white"
                            style={{ backgroundColor: p.color }}
                          >
                            {p.name[0]}
                          </div>
                        ))}
                        {meeting.participants.length > 4 && (
                          <div className="w-5 h-5 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-[9px] text-white">
                            +{meeting.participants.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{meeting.participants.length}명</span>
                      {total > 0 && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span className="text-xs" style={{ color: '#0066FF', fontWeight: 500 }}>
                            {formatAmount(total)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </button>
              );
            })}
          </div>
        )}

        <div className="h-8" />
      </div>

      {showAddModal && (
        <AddMeetingModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
