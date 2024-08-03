import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import GeoService from "../../../services/GeoService";

const CreateGeo = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    nameCity: "",
    type: "",
    countryId: "",
    nameDistrict: "",
    provinceId: "",
  });
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [showModal, setShowModal] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [countryData, rovincesData] = await Promise.all([
        GeoService.getAllCountries(),
        GeoService.getAllProvinces(),
      ]);

      setCountries(countryData.$values || []);
      setProvinces(rovincesData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, nameCity, type, countryId, nameDistrict, provinceId } =
      values;
    let newErrors = {};

    if (showModal === "country") {
      if (!name) newErrors.name = "Not Empty.";
    } else if (showModal === "province") {
      if (!nameCity) newErrors.nameCity = "Not Empty.";
      if (!type) newErrors.type = "Not Empty.";
      if (!countryId) newErrors.countryId = "Not Empty.";
    } else if (showModal === "district") {
      if (!nameDistrict) newErrors.nameDistrict = "Not Empty.";
      if (!provinceId) newErrors.provinceId = "Not Empty.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      if (showModal === "country") {
        await GeoService.createCountry(name);
      } else if (showModal === "province") {
        await GeoService.createProvince(nameCity, type, countryId);
      } else if (showModal === "district") {
        await GeoService.createDistrict(nameDistrict, type, provinceId);
      }

      toast.success("Created successfully.");

      setValues({
        value: "",
      });
      navigate("/dashboard/geo");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setValues({
      values: "",
    });
    setErrors({
      errors: "",
    });
    setShowModal("");
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">
            {pathname.split("/").pop()}
          </div>
          <Link to="/dashboard/geo">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Back to List
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 p-2 sm:p-5 bg-gray-100 rounded-md">
          {errors.apiError && (
            <div
              className="p-4 my-2 text-sm text-red-700 rounded-lg bg-red-100"
              role="alert"
            >
              <span className="font-bold">Error: </span>
              {errors.apiError}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 p-3">
            <button
              onClick={() => setShowModal("country")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Country
            </button>
            <button
              onClick={() => setShowModal("province")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create Province
            </button>
            <button
              onClick={() => setShowModal("district")}
              className="px-3 py-2 bg-blue-950 text-white rounded-md"
            >
              Create District
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
              <div className="bg-white p-4 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold mb-4 text-center">
                  Create{" "}
                  {showModal.charAt(0).toUpperCase() + showModal.slice(1)}
                </h3>
                <form onSubmit={handleSubmit}>
                  {showModal === "country" && (
                    <label className="block">
                      <span className="block font-medium text-primary mb-1">
                        Name:
                      </span>
                      <input
                        type="text"
                        className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        placeholder="Enter country name"
                        name="name"
                        value={values.name}
                        onChange={handleChangeInput}
                      />
                      {errors.name && (
                        <span className="text-red-700">{errors.name}</span>
                      )}
                    </label>
                  )}
                  {showModal === "province" && (
                    <>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter province name"
                          name="nameCity"
                          value={values.nameCity}
                          onChange={handleChangeInput}
                        />
                        {errors.nameCity && (
                          <span className="text-red-700">
                            {errors.nameCity}
                          </span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Province Type:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter province type"
                          name="type"
                          value={values.type}
                          onChange={handleChangeInput}
                        />
                        {errors.type && (
                          <span className="text-red-700">{errors.type}</span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Country:
                        </span>
                        <select
                          name="countryId"
                          value={values.countryId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.Id} value={country.Id}>
                              {country.Name}
                            </option>
                          ))}
                        </select>
                        {errors.countryId && (
                          <span className="text-red-700">
                            {errors.countryId}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  {showModal === "district" && (
                    <>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Name:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter province name"
                          name="nameDistrict"
                          value={values.nameDistrict}
                          onChange={handleChangeInput}
                        />
                        {errors.nameDistrict && (
                          <span className="text-red-700">
                            {errors.nameDistrict}
                          </span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          District Type:
                        </span>
                        <input
                          type="text"
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                          placeholder="Enter province type"
                          name="type"
                          value={values.type}
                          onChange={handleChangeInput}
                        />
                        {errors.type && (
                          <span className="text-red-700">{errors.type}</span>
                        )}
                      </label>
                      <label className="block mb-1">
                        <span className="block font-medium text-primary mb-1">
                          Province:
                        </span>
                        <select
                          name="provinceId"
                          value={values.provinceId}
                          onChange={handleChangeInput}
                          className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                        >
                          <option value="">Select Province</option>
                          {provinces.map((province) => (
                            <option key={province.Id} value={province.Id}>
                              {province.NameCity}
                            </option>
                          ))}
                        </select>
                        {errors.provinceId && (
                          <span className="text-red-700">
                            {errors.provinceId}
                          </span>
                        )}
                      </label>
                    </>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      type="submit"
                      className="px-3 py-2 bg-blue-950 text-white rounded-md"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="button"
                      className="px-3 py-2 bg-gray-300 rounded-md"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateGeo;
