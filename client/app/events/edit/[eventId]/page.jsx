"use client";
import { useParams } from "next/navigation";
import MatchForm from "../../../_components/MatchForm";

const EditPage = () => {
  const params = useParams();
  const eventId = params?.eventId;

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    marginTop: "1rem",
    borderRadius: "0.5rem",
  };

  const defaultCenter = {
    lat: 40.7128,
    lng: -74.006,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Edit Match</h1>
      {eventId ? (
        <MatchForm
          matchId={eventId}
          mapContainerStyle={mapContainerStyle}
          defaultCenter={defaultCenter}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditPage;
