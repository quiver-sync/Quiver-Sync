// Center.jsx (assembled from subcomponents)
import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { useUser } from "../../../../context/UserContext";

import HeroCarouselSection from "./HeroCarouselSection";
import QuiverSection from "./QuiverSection";
import SurfHeroPitch from "./SurfHeroPitch";
import HowItWorksSteps from "./HowItWorksSteps";
import FeaturedSpotBanner from "./FeaturedSpotBanner";

function Center({ Carousel }) {
  const [boards, setBoards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get("/boards/mine");
        setBoards(res.data || []);
      } catch (err) {
        console.error("Failed to load user boards:", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b from-sky-50 to-white">
      <HeroCarouselSection Carousel={Carousel} user={user} />
      {user && <QuiverSection boards={boards} />}
      <SurfHeroPitch user={user} />
      <FeaturedSpotBanner />
    </div>
  );
}

export default Center;
