import { useState, useEffect } from "react";
import { fetchTopics } from "../src/api";
import TopicsCard from "./TopicsCard";

function Topics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  return (
    <div className="general">
      <h2>Topics</h2>
      <ul>
        
            <TopicsCard {...topics} />
          
      </ul>
    </div>
  );
}

export default Topics;
