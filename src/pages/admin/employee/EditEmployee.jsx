import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { no_avatar } from "../../../assets/index";
import Loading from "../../../components/Loading";
import EmployeeService from "../../../services/EmployeeService";
import EducationService from "../../../services/EducationService";
import DepartmentService from "../../../services/DepartmentService";
import GeoService from "../../../services/GeoService";

const phone_REGEX = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const civilId_REGEX = /^[a-zA-Z0-9]{8,12}$/;

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    Name: "",
    CivilId: "",
    Gender: "",
    Birthday: "",
    FileName: "",
    JobName: "",
    Address: "",
    PhoneNumber: "",
    BranchId: "",
    Other: "",
    EducationId: "",
    CountryId: "",
    ProvinceId: "",
    DistrictId: "",
    IsDirector: "",
    IsHeadOfDepartment: "",
    ManagerId: "",
    PositionId: "",
    file: null,
  });

  const [image, setImage] = useState(null);
  const [generalDepartments, setGeneralDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [listManagers, setListManagers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [branchs, setBranchs] = useState([]);
  const [educations, setEducations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleChangeInput = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setValues({ ...values, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await EmployeeService.getById(id);
        setValues({
          file: data.photo || null,
          Name: data.name || "",
          Birthday: formatDate(data.birthday) || "",
          BranchId: data.branchId || "",
          Address: data.address || "",
          CivilId: data.civilId || "",
          CountryId: data.countryId || "",
          DistrictId: data.districtId || "",
          EducationId: data.educationId || "",
          FileName: data.fileName || "",
          Gender: data.gender || "",
          IsDirector:
            data.isDirector !== undefined ? String(data.isDirector) : "",
          IsHeadOfDepartment:
            data.isHeadOfDepartment !== undefined
              ? String(data.isHeadOfDepartment)
              : "",
          JobName: data.jobName || "",
          ManagerId: data.managerId || "",
          PositionId: data.positionId || "",
          Other: data.other || "",
          PhoneNumber: data.phoneNumber || "",
          ProvinceId: data.provinceId || "",
        });

        if (data.photo) {
          setImage(data.photo);
        }
      } catch (error) {
        toast.error(error);
        navigate("/dashboard/employees");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      Name,
      CivilId,
      Gender,
      Birthday,
      FileName,
      JobName,
      Address,
      PhoneNumber,
      Other,
      EducationId,
      PositionId,
      BranchId,
      CountryId,
      ProvinceId,
      DistrictId,
      IsDirector,
      IsHeadOfDepartment,
      ManagerId,
      file,
    } = values;

    let newErrors = {};

    // Validate inputs
    if (!Name) newErrors.Name = "Name is required.";

    if (!CivilId) newErrors.CivilId = "Civil Id is required.";
    else if (!civilId_REGEX.test(CivilId))
      newErrors.CivilId = "Invalid Civil Id format.";

    if (!Gender) newErrors.Gender = "Gender is required.";
    if (!file) newErrors.file = "Image is required.";
    if (!Birthday) newErrors.Birthday = "Birthday is required.";
    if (!FileName) newErrors.FileName = "File name is required.";
    if (!JobName) newErrors.JobName = "Job name is required.";
    if (!Address) newErrors.Address = "Address is required.";
    if (!IsDirector) newErrors.IsDirector = "Director is required.";
    if (!IsHeadOfDepartment) newErrors.IsHeadOfDepartment = "Head of department is required.";

    if (!PhoneNumber) newErrors.PhoneNumber = "Phone number is required.";
    else if (!phone_REGEX.test(PhoneNumber))
      newErrors.PhoneNumber = "Invalid phone format.";

    if (!BranchId) newErrors.BranchId = "Branch is required.";
    if (!EducationId) newErrors.EducationId = "Education is required.";
    if (!CountryId) newErrors.CountryId = "Country is required.";
    if (!ProvinceId) newErrors.ProvinceId = "Province is required.";
    if (!DistrictId) newErrors.DistrictId = "District is required.";
    if (!PositionId) newErrors.PositionId = "Position is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 5000);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await EmployeeService.updateEmployee(
        id,
        Name,
        CivilId,
        Gender,
        Birthday,
        FileName,
        JobName,
        Address,
        PhoneNumber,
        Other,
        EducationId,
        PositionId,
        BranchId,
        CountryId,
        ProvinceId,
        DistrictId,
        IsDirector,
        IsHeadOfDepartment,
        ManagerId,
        file
      );

      setValues({
        value: null,
      });
      setImage(null);

      toast.success("Employee updated successfully.");
      navigate("/dashboard/employees");
    } catch (error) {
      console.log(error);
      setErrors({ apiError: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        generalDepartmentsData,
        positionsData,
        departmentsData,
        branchData,
        educationData,
        countryData,
        provinceData,
        districtData,
        listManagersData,
      ] = await Promise.all([
        DepartmentService.getAllGeneralDepartments(),
        DepartmentService.getAllPositions(),
        DepartmentService.getAllDepartments(),
        DepartmentService.getAllBranchs(),
        EducationService.getAllEducations(),
        GeoService.getAllCountries(),
        GeoService.getAllProvinces(),
        GeoService.getAllDistricts(),
        EmployeeService.getAllEmployeesNotStaff(),
      ]);

      setGeneralDepartments(generalDepartmentsData.$values || []);
      setPositions(positionsData.$values || []);
      setDepartments(departmentsData.$values || []);
      setBranchs(branchData.$values || []);
      setEducations(educationData.$values || []);
      setCountries(countryData.$values || []);
      setProvinces(provinceData.$values || []);
      setDistricts(districtData.$values || []);
      setListManagers(listManagersData || []);
    } catch (error) {
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: "Name", type: "text", value: "Name", placeholder: "Enter name" },
    {
      label: "Civil Id",
      type: "text",
      value: "CivilId",
      placeholder: "Enter civil id",
    },
    { label: "Birthday", type: "date", value: "Birthday" },
    {
      label: "File Name",
      type: "text",
      value: "FileName",
      placeholder: "Enter file name",
    },
    {
      label: "Job Name",
      type: "text",
      value: "JobName",
      placeholder: "Enter job name",
    },
    {
      label: "Phone Number",
      type: "text",
      value: "PhoneNumber",
      placeholder: "Enter phone number",
    },
    {
      label: "Address",
      type: "text",
      value: "Address",
      placeholder: "Enter address",
    },
    {
      label: "Other",
      type: "text",
      value: "Other",
      placeholder: "Enter other details",
    },
  ];

  const selectFields = [
    {
      label: "Gender",
      name: "Gender",
      options: [
        { value: "", text: "Select Gender" },
        { value: "Male", text: "Male" },
        { value: "Female", text: "Female" },
      ],
    },
    {
      label: "Education",
      name: "EducationId",
      options: [
        { value: "", text: "Select Education" },
        ...educations.map((e) => ({ value: e.Id, text: e.Name })),
      ],
    },
    {
      label: "Branch",
      name: "BranchId",
      options: [
        { value: "", text: "Select Branch" },
        ...branchs.map((b) => ({ value: b.Id, text: b.Name })),
      ],
    },
    {
      label: "Country",
      name: "CountryId",
      options: [
        { value: "", text: "Select Country" },
        ...countries.map((c) => ({ value: c.Id, text: c.Name })),
      ],
    },
    {
      label: "Province",
      name: "ProvinceId",
      options: [
        { value: "", text: "Select Province" },
        ...provinces.map((p) => ({ value: p.Id, text: p.Type })),
      ],
    },
    {
      label: "District",
      name: "DistrictId",
      options: [
        { value: "", text: "Select District" },
        ...districts.map((d) => ({ value: d.Id, text: d.Id })), // đang lỗi
      ],
    },
    {
      label: "Manager",
      name: "ManagerId",
      options: [
        { value: "", text: "Select Manager" },
        ...listManagers.map((m) => ({ value: m.id, text: m.name })),
      ],
    },
    {
      label: "Position",
      name: "PositionId",
      options: [
        { value: "", text: "Select Position" },
        ...positions.map((m) => ({ value: m.Id, text: m.Name })),
      ],
    },
    {
      label: "Director",
      name: "IsDirector",
      options: [
        { value: "", text: "Select" },
        { value: "false", text: "No" },
        { value: "true", text: "Yes" },
      ],
    },
    {
      label: "Head of Department",
      name: "IsHeadOfDepartment",
      options: [
        { value: "", text: "Select" },
        { value: "false", text: "No" },
        { value: "true", text: "Yes" },
      ],
    },
  ];

  return (
    <>
      {loading && <Loading />}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-xl capitalize">Edit</div>
          <Link to="/dashboard/employees">
            <button className="px-3 py-2 bg-blue-950 text-white rounded-md">
              Back to List
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 p-2 sm:p-5 bg-gray-100 rounded-md">
          {errors && errors.apiError && (
            <div
              className="p-4 my-2 text-sm text-red-700 rounded-lg bg-red-100"
              role="alert"
            >
              <span className="font-bold">Error: </span>
              {errors.apiError}
            </div>
          )}
          <form
            className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-3"
            onSubmit={handleSubmit}
          >
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <label>
                <img
                  className="h-[10rem] w-[10rem] object-cover rounded-full"
                  src={image ? image : no_avatar}
                  alt="Current profile photo"
                />
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={handleChangeInput}
                />
              </label>
              {errors.photo && (
                <span className="text-red-700">{errors.photo}</span>
              )}
            </div>
            <div className="sm:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {inputFields.map((item, index) => (
                  <label
                    className={`${
                      item.full ? "xl:col-span-2 col-span-1" : "col-span-1"
                    }`}
                    key={index}
                  >
                    <span className="block font-medium text-primary">
                      {item.label}:
                    </span>
                    <input
                      type={item.type}
                      className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                      placeholder={item.placeholder}
                      name={item.value}
                      value={values[item.value]}
                      onChange={handleChangeInput}
                    />
                    {errors[item.value] && (
                      <span className="text-red-700">{errors[item.value]}</span>
                    )}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {selectFields.map((item, index) => (
                  <label className="block" key={index}>
                    <span className="block font-medium text-primary">
                      {item.label}:
                    </span>
                    <select
                      id={item.name}
                      name={item.name}
                      value={values[item.name]}
                      onChange={handleChangeInput}
                      className="px-3 py-2 border shadow-sm border-primary placeholder-slate-400 focus:outline-none block w-full rounded-lg sm:text-sm"
                    >
                      {item.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                    {errors[item.name] && (
                      <span className="text-red-700">{errors[item.name]}</span>
                    )}
                  </label>
                ))}
              </div>
              <button
                type="submit"
                className="px-3 py-2 bg-blue-950 text-white rounded-md"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
