import { Link } from "react-router-dom";

export default function DestinationCard({ image, title, blurb, to,  }) {
  return (
    <div className="card p-3 bg-[#dcfff3]">
      <div className="rounded-xl overflow-hidden">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
      </div>
      <div className="px-2 py-3">
        <h3 className="font-serif text-2xl font-extrabold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{blurb}</p>
        <div className="mt-4">
          <Link to={to} className="text-blue-700 underline">Explore</Link>
        </div>
      </div>
    </div>
  );
}
