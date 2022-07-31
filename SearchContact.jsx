import { useContext } from "react";
import { Purple, Comment } from "../helper/Colors";
import { ContactContext } from "../Components/context/contactContext";

const SearchContact = () => {
  const { contactSearch } = useContext(ContactContext);
  return (
    <div className="input-group mx-2 w-75" dir="ltr">
      <span
        className="input-group-text"
        id="basic-adoon1"
        style={{ backgroundColor: Purple }}
      >
        <i className="fas fa-search"></i>
      </span>
      <input
        type="text"
        dir="rtl"
        step={{ backgroundColor: Comment, borderColor: Purple }}
        className="form-control"
        placeholder="جستجو مخاطب"
        aria-label="Search"
        aria-describedby="basic-addon1"
        onChange={(event) => contactSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchContact;
