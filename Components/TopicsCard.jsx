import { Link } from "react-router-dom";

export default function TopicsCard({ topics }) {
  
  if (!topics || topics.length === 0) {
    return <p>loading topics</p>;
  }

  return (
    <div className="topics-section">
      <div className="topics-card">
        {topics.map((topic) => (
          <div className="topics-details" key={topic.slug}>
            <h2>
              <Link to={`/topics/${topic.slug}/articles`}>
                {topic.slug}
              </Link>
            </h2>
            <br></br>
            <p>{topic.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
