import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "../../components/spinner";
import DetailLayout from "../../components/DetailLayout";

export default function PlaceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const res = await axios.get(
          `https://api.unsplash.com/photos/${id}?client_id=TQ3RVdVpPRXbH5U-_GTJBWR_DmP4FsWH6ObolrjM0hY`
        );
        setPlace(res.data);
      } catch (error) {
        console.error("Error fetching place:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPlace();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <DetailLayout
      title={place.description || place.alt_description}
      imageUrl={`${place.urls.regular}&auto=format&fit=crop&w=1920&q=80`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Location Details</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-semibold">Country</h3>
              <p>{place.location?.country || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Region</h3>
              <p>{place.location?.name || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Latitude</h3>
              <p>{place.location?.position?.latitude || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Longitude</h3>
              <p>{place.location?.position?.longitude || 'N/A'}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {place.tags?.map(tag => (
                <span 
                  key={tag.title}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Photography Info</h3>
            <div className="space-y-3">
              <p><span className="font-semibold">Photographer:</span> {place.user?.name}</p>
              <p><span className="font-semibold">Camera:</span> {place.exif?.name || 'N/A'}</p>
              <p><span className="font-semibold">Lens:</span> {place.exif?.lens || 'N/A'}</p>
              <p><span className="font-semibold">Dimensions:</span> {place.width}x{place.height}</p>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
}