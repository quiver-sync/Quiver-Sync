import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState("");

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const res = await axios.get("/rental-requests/mine");
        setRequests(res.data); 
      } catch (err) {
        console.error("❌ Failed to fetch rental requests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, []);
  useEffect(()=>{
    console.log(requests)
  },[requests])

  const handleCancel = async (id) => {
    try {
      setCancelingId(id);
      await axios.delete(`/rental-requests/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("❌ Failed to cancel request:", err);
    } finally {
      setCancelingId("");
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-blue-700">Loading your rental requests...</p>;

  if (!requests.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-6 py-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4825/4825050.png"
          alt="No requests"
          className="w-28 h-28 mb-4 opacity-80"
        />
        <h2 className="text-xl font-semibold text-blue-700 mb-1">
          No Rental Requests Sent
        </h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          You haven’t requested any rentals yet. Go explore and find the right board for you!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800">
          🧾 My Rental Requests
        </h1>

        <div className="space-y-6">
          {requests.map((req) => {
            const { board, startDate, endDate, status, _id } = req;
            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            const price = board?.pricePerDay || 0;
            const total = days * req.rental.pricePerDay;

            return (
              <div
                key={_id}
                className="bg-white rounded-xl shadow-sm border p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={board?.image}
                    alt={board?.model}
                    className="h-24 w-24 object-contain border rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-blue-800">
                      {board?.model}
                    </h2>
                    <p className="text-sm text-gray-700">
                      {start.toLocaleDateString()} → {end.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status:{" "}
                      <span className={`font-semibold ${
                        status === "approved"
                          ? "text-green-600"
                          : status === "rejected"
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}>
                        {status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      Total: ${total}
                    </p>
                  </div>
                </div>

                {status === "pending" && (
                  <button
                    onClick={() => handleCancel(_id)}
                    disabled={cancelingId === _id}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold border border-red-500 text-red-600 bg-white 
                      hover:bg-red-50 hover:text-red-700 hover:border-red-600 
                      focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  >
                    ❌ Cancel
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyRequests;
