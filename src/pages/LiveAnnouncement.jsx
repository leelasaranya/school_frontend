import { useEffect, useState } from "react";
import api from "../api/axios"; // ✅ NORMAL AXIOS (IMPORTANT)
import LiveCommentChat from "./LiveCommentChat";
import "../styles/LiveAnnouncement.css";

export default function LiveAnnouncement() {
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get("events/current/winner/");

        if (res.data && res.data.performance_id) {
          setWinner(res.data);
          setLoading(false);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Winner fetch error", err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !winner) {
    return <div className="announcement-loading">⏳ Waiting...</div>;
  }

  return (
    <div className="announcement-layout">
      {/* LEFT → WINNER */}
      <div className="announcement-page">
        <h1 className="announcement-title">
          And the Winner Is<span>...</span>
        </h1>

        <div className="winner-card">
          <div className="winner-avatar">
            <img
                src={
                  winner.photo
                    ? winner.photo
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="winner"
              />

            <div className="winner-ring"></div>
          </div>

          <div className="winner-details">
            <h2>{winner.student}</h2>
            <p>🏫 {winner.school}</p>
            <p>🎵 {winner.performance_title}</p>
            <p>⭐ Jury Avg: {winner.jury_avg}</p>
            <p>🗳 Votes: {winner.votes}</p>

            <div className="final-score">
              Final Score: <span>{winner.final_score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT → LIVE CHAT */}
      <div className="announcement-chat">
  <LiveCommentChat
    key={winner.performance_id}   // 🔥 THIS IS THE MAGIC
    performanceId={winner.performance_id}
  />
</div>

    </div>
  );
}
