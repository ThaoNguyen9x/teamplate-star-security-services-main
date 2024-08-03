import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import Delete from "../../../components/admin/Delete";
import GeoService from "../../../services/GeoService";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const paginationComponentOptions = {
  rowsPerPageText: "Rows per page",
  rangeSeparatorText: "of",
  noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

const ListGeo = () => {
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [editItem, setEditItem] = useState({
    id: "",
    name: "",
    type: "",
    countryId: "",
    provinceId: "",
    model: "",
  });

  const [searchQuery, setSearchQuery] = useState({
    country: "",
    province: "",
    district: "",
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [countriesData, provincesData, districtsData] = await Promise.all([
        GeoService.getAllCountries(),
        GeoService.getAllProvinces(),
        GeoService.getAllDistricts(),
      ]);

      setCountries(countriesData.$values || []);
      setProvinces(provincesData.$values || []);
      setDistricts(districtsData.$values || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = useCallback(
    (id, name, type, countryId, provinceId, model) => {
      setEditItem({ id, name, type, countryId, provinceId, model });
    },
    []
  );

  const handleUpdate = useCallback(async () => {
    setLoading(true);
    
    try {
      const { id, name, type, countryId, provinceId, model } = editItem;

      if (model === "country") {
        if (!name) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeoService.updateCountry(id, name);
      } else if (model === "province") {
        if (!name || !type || !countryId) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeoService.updateProvince(id, name, type, countryId);
      } else if (model === "district") {
        if (!name || !type || !provinceId) {
          toast.error("Please fill out all required fields.");
          return;
        }

        await GeoService.updateDistrict(id, name, type, provinceId);
      }

      await fetchAllData();
      toast.success("Updated successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setEditItem({
        value: "",
      });
    }
  }, [editItem]);

  const handleDeleteClick = useCallback((id, model) => {
    setRemove(true);
    setCurrentId(id);
    setEditItem((prevState) => ({ ...prevState, model }));
  }, []);

  const handleDelete = useCallback(async () => {
    setLoading(true);

    try {
      const { model } = editItem;

      if (model === "country") {
        await GeoService.deleteCountry(currentId);
        setCountries((prevCountries) =>
          prevCountries.filter((c) => c.Id !== currentId)
        );
      } else if (model === "province") {
        await GeoService.deleteProvince(currentId);
        setProvinces((prevProvinces) =>
          prevProvinces.filter((p) => p.Id !== currentId)
        );
      } else if (model === "district") {
        await GeoService.deleteDistrict(currentId);
        setDistricts((prevDistricts) =>
          prevDistricts.filter((d) => d.Id !== currentId)
        );
      }

      await fetchAllData();
      toast.success("Deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setRemove(false);
      setEditItem({
        value: "",
      });
    }
  }, [editItem, currentId]);

  const renderColumns = useCallback(
    (model) => {
      const getName = (row) => {
        switch (model) {
          case "country":
            return row.Name;
          case "province":
            return row.NameCity;
          case "district":
            return row.NameDistrict;
          default:
            return "";
        }
      };

      const getCountriesOptions = () => {
        return countries.map((c) => (
          <option key={c.Id} value={c.Id}>
            {c.Name}
          </option>
        ));
      };

      const getProvincesOptions = () => {
        return provinces.map((p) => (
          <option key={p.Id} value={p.Id}>
            {p.NameCity}
          </option>
        ));
      };

      const getRelatedName = (row) => {
        if (model === "province") {
          return countries.find((c) => c.Id === row.CountryId)?.Name || "N/A";
        }
        if (model === "district") {
          return (
            provinces.find((p) => p.Id === row.ProvinceId)?.NameCity || "N/A"
          );
        }
        return null;
      };

      return [
        {
          name: "#",
          selector: (row, index) => index + 1,
          sortable: true,
        },
        {
          name: "Name",
          selector: (row) => getName(row),
          cell: (row) =>
            editItem.id === row.Id && editItem.model === model ? (
              <input
                type="text"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded-md outline-none"
              />
            ) : (
              getName(row)
            ),
          sortable: true,
        },
        ...(model === "province" || model === "district"
          ? [
              {
                name: "Type",
                selector: (row) => row.Type,
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <input
                      type="text"
                      value={editItem.type}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          type: e.target.value,
                        }))
                      }
                      className="border p-1 rounded"
                    />
                  ) : (
                    row.Type
                  ),
                sortable: true,
              },
              {
                name: model === "province" ? "Country" : "Province",
                selector: (row) => getRelatedName(row),
                cell: (row) =>
                  editItem.id === row.Id && editItem.model === model ? (
                    <select
                      value={editItem.countryId || editItem.provinceId}
                      onChange={(e) =>
                        setEditItem((prevState) => ({
                          ...prevState,
                          countryId:
                            model === "province"
                              ? e.target.value
                              : prevState.countryId,
                          provinceId:
                            model === "district"
                              ? e.target.value
                              : prevState.provinceId,
                        }))
                      }
                      className="border px-3 py-2 rounded-md"
                    >
                      <option value="">Select</option>
                      {model === "province"
                        ? getCountriesOptions()
                        : getProvincesOptions()}
                    </select>
                  ) : (
                    getRelatedName(row)
                  ),
                sortable: true,
              },
            ]
          : []),
        {
          name: "Actions",
          cell: (row) => (
            <>
              {editItem.id === row.Id && editItem.model === model ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUpdate}
                    className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      setEditItem({
                        id: null,
                        name: "",
                        type: "",
                        countryId: "",
                        provinceId: "",
                        model: "",
                      })
                    }
                    className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleEditClick(
                        row.Id,
                        getName(row),
                        row.Type,
                        row.CountryId,
                        row.ProvinceId,
                        model
                      )
                    }
                    className="px-3 py-2 border border-blue-950 text-blue-950 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(row.Id, model)}
                    className="px-3 py-2 border border-red-700 text-red-700 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          ),
        },
      ];
    },
    [editItem, countries, provinces, handleUpdate, handleDeleteClick]
  );

  const handleSearchChange = (model) => (event) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [model]: event.target.value,
    }));
  };

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Geo</div>
          <Link to="/dashboard/geo/create">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Create New
            </button>
          </Link>
        </div>

        <div className="grid p-5 bg-gray-100 rounded-md">
          {["country", "province", "district"].map((model) => (
            <div key={model}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold my-5">
                  {model.charAt(0).toUpperCase() + model.slice(1)}
                </h3>

                <input
                  type="text"
                  placeholder={`Search ${
                    model === "country"
                      ? "countries"
                      : model === "province"
                      ? "provinces"
                      : "districts"
                  }`}
                  value={searchQuery[model]}
                  onChange={handleSearchChange(model)}
                  className="border border-gray-300 px-3 py-2 rounded-md outline-none"
                />
              </div>
              <DataTable
                columns={renderColumns(model)}
                data={
                  model === "country"
                    ? countries.filter((c) =>
                        c.Name.toLowerCase().includes(
                          searchQuery.country.toLowerCase()
                        )
                      )
                    : model === "province"
                    ? provinces.filter((p) =>
                        p.NameCity.toLowerCase().includes(
                          searchQuery.province.toLowerCase()
                        )
                      )
                    : districts.filter((d) =>
                        d.NameDistrict.toLowerCase().includes(
                          searchQuery.district.toLowerCase()
                        )
                      )
                }
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={{
                  headCells: {
                    style: {
                      fontSize: "16px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      background: "#f3f4f6",
                      padding: "12px 24px",
                    },
                  },
                  cells: {
                    style: {
                      fontSize: "14px",
                      background: "#f3f4f6",
                      padding: "12px 24px",
                    },
                  },
                  pagination: {
                    style: {
                      fontSize: "14px",
                      background: "#f3f4f6",
                      padding: "12px 24px",
                    },
                  },
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {remove && (
        <Delete
          id={currentId}
          handleDelete={handleDelete}
          setRemove={setRemove}
        />
      )}
    </>
  );
};

export default ListGeo;
