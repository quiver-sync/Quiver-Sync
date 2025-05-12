import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useUser } from "../../../context/UserContext";

const RentalRequestsReceived = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const { user } = useUser();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("/rental-requests/received");
        const filtered = res.data.filter(
          (req) => req.status !== "rejected" && req.hirer?._id !== user?.id
        );

        // For each request, fetch the rental data for pricePerDay
        const rentalFetches = filtered.map((req) =>
          axios.get(`/rentals/${req.rental}`)
        );
        const rentalResponses = await Promise.all(rentalFetches);

        const enrichedRequests = filtered.map((req, i) => ({
          ...req,
          pricePerDay: rentalResponses[i].data.pricePerDay
        }));

        setRequests(enrichedRequests);
      } catch (err) {
        console.error("❌ Failed to fetch received requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchRequests();
  }, [user]);

  const handleDecision = async (requestId, approve = false) => {
    try {
      setActionLoading(requestId);
      await axios.put(`/rental-requests/${requestId}`, {
        status: approve ? "approved" : "rejected",
      });
      if (approve) {
        await axios.post(`/active-rentals/from-request/${requestId}`);
      }
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.error("❌ Failed to update request:", err);
    } finally {
      setActionLoading("");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-blue-700">
        Loading rental requests...
      </p>
    );

  if (!requests.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-6 py-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
          alt="No requests"
          className="w-32 h-32 mb-6 opacity-80"
        />
        <h2 className="text-2xl font-semibold text-blue-700 mb-2">
          No Rental Requests Yet
        </h2>
        <p className="text-gray-500 text-sm text-center max-w-sm">
          You haven’t received any rental requests for your boards. Once someone
          requests one of your rentals, it’ll show up here for approval.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800">
          📥 Rental Requests for Your Boards
        </h1>

        <div className="space-y-6">
          {requests.map((req) => {

            if(req.status==='pending'){
            console.log(req)
            const { _id, startDate, endDate, hirer, board} = req;
            const pricePerDay = req.pricePerDay;

            const start = new Date(startDate);
            const end = new Date(endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            const totalPrice = days * pricePerDay;
            
            return (
              <div
                key={_id}
                className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={board?.image}
                    alt={board?.model}
                    className="h-28 w-28 object-contain bg-white border rounded-lg"
                  />
                  <div className="text-sm text-gray-700 space-y-1">
                    <h2 className="text-lg font-semibold text-blue-800">
                      {board?.model}
                    </h2>
                    <p>
                      <strong>Type:</strong> {board?.type}
                    </p>
                    <p>
                      <strong>Size:</strong> {board?.length}' × {board?.width}" — {board?.volume}L
                    </p>
                    <p>
                      <strong>Fins:</strong> {board?.fins}
                    </p>
                    <p>
                      <strong>Hirer:</strong> {hirer?.username}
                    </p>
                    <p>
                      <strong>Dates:</strong> {start.toLocaleDateString()} → {end.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Total:</strong> ${totalPrice} <span className="text-xs text-gray-500">({days} days × ${pricePerDay})</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:ml-4">
                  <button
                    disabled={actionLoading === _id}
                    onClick={() => handleDecision(_id, true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    ✅ Approve
                  </button>
                  <button
                    disabled={actionLoading === _id}
                    onClick={() => handleDecision(_id, false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            );
          }
          else{
            return (
              <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-6 py-20">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                  alt="No requests"
                  className="w-32 h-32 mb-6 opacity-80"
                />
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">
                  No Rental Requests Yet
                </h2>
                <p className="text-gray-500 text-sm text-center max-w-sm">
                  You haven’t received any rental requests for your boards. Once someone
                  requests one of your rentals, it’ll show up here for approval.
                </p>
              </div>
            );
          }
          })}
        </div>
      </div>
    </div>
  );
};

export default RentalRequestsReceived;
