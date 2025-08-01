import { useNavigate } from "react-router-dom";
import MobileSearch from "../../components/search/MobileSearch";

const Search: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen overflow-hidden lg:hidden">
      <MobileSearch onBack={handleBack} />
    </div>
  );
};

export default Search;
