import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "../../components/spinner";
import DetailLayout from "../../components/DetailLayout";

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <DetailLayout
      title={book.volumeInfo.title}
      imageUrl={book.volumeInfo.imageLinks?.thumbnail?.replace('zoom=1', 'zoom=2')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-600 mb-6">{book.volumeInfo.description || 'No description available'}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="font-semibold">Authors</h3>
              <p>{book.volumeInfo.authors?.join(', ') || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Published Date</h3>
              <p>{book.volumeInfo.publishedDate}</p>
            </div>
            <div>
              <h3 className="font-semibold">Page Count</h3>
              <p>{book.volumeInfo.pageCount || 'N/A'}</p>
            </div>
            <div>
              <h3 className="font-semibold">Categories</h3>
              <p>{book.volumeInfo.categories?.join(', ') || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Book Details</h3>
            <div className="space-y-3">
              <p><span className="font-semibold">Publisher:</span> {book.volumeInfo.publisher || 'N/A'}</p>
              <p><span className="font-semibold">ISBN:</span> {book.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A'}</p>
              <p><span className="font-semibold">Language:</span> {book.volumeInfo.language?.toUpperCase()}</p>
              <p><span className="font-semibold">Average Rating:</span> {book.volumeInfo.averageRating || 'N/A'} ⭐</p>
            </div>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
}