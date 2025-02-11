import { Button, Dropdown, Space, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./Category_Product.scss";
import Product_Carts from "../../components/Product_Carts";
import ButtonSeeMore from "../../components/ButtonSeeMore";
import { getAllPets, getAllBreed } from "../../../services/petServices";
import {
  getAllProduct,
  findByCategory,
  getProductByName,
  findDiscount,
} from "../../../services/productServices";
import { getPaginateProduct } from "../../../services/paginateServices";
import { fetchAllCategory } from "../../../services/categoryServices";
import { getAllPetType } from "../../../services/petTypeServices";

const Category_Product = () => {
  const location = useLocation();
  const inputSearch = location.state;
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { type } = useParams();
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [selectedSort, setSelectedSort] = useState("asc");

  const fetchFilterOptions = async () => {
    try {
      if (type === "pets") {
        const data = await getAllPetType();
        setFilterOptions(data.data);
      } else {
        const data = await fetchAllCategory();
        setFilterOptions(data.data);
      }
    } catch (error) {
      console.error("Error fetching filter options:", error);
    }
  };

  const fetchBreedOptions = async () => {
    try {
      const data = await getAllBreed();
      setBreedOptions(data.data);
    } catch (error) {
      console.error("Error fetching breed options:", error);
    }
  };

  const fetchListProduct = async () => {
    try {
      let data;
      switch (type) {
        case "pets":
          data = await getAllPets();
          break;
        case "products":
          data = await getAllProduct();
          break;
        case "pettags":
          data = await findByCategory(4);
          break;
        case "discount":
          data = await findDiscount();
          break;
        case "search":
          data = await getProductByName(inputSearch?.inputSearch);
          break;
        default:
          data = { data: [] };
      }

      let productList = data?.data || [];

      // Lọc theo price
      if (selectedPrices.length > 0) {
        productList = productList.filter((product) => {
          return selectedPrices.some((priceRange) => {
            switch (priceRange) {
              case "under_20000":
                return product.price < 20000;
              case "20000_50000":
                return product.price >= 20000 && product.price <= 50000;
              case "50000_100000":
                return product.price >= 50000 && product.price <= 100000;
              case "100000_500000":
                return product.price >= 100000 && product.price <= 500000;

              case "500000_1000000":
                return product.price >= 500000 && product.price <= 1000000;

              case "1000000_5000000":
                return product.price >= 1000000 && product.price <= 5000000;

              case "5000000_10000000":
                return product.price >= 5000000 && product.price <= 10000000;

              case "above_10000000":
                return product.price > 10000000;
              default:
                return false;
            }
          });
        });
      }

      // Lọc theo brand
      if (selectedBrands.length > 0) {
        productList = productList.filter((product) =>
          selectedBrands.includes(
            String(type === "pets" ? product.pet_type_id : product.category_id)
          )
        );
      }

      // Lọc theo breed
      if (selectedBreeds.length > 0 && type === "pets") {
        productList = productList.filter((product) =>
          selectedBreeds.includes(product.breed)
        );
      }

      // Sắp xếp sản phẩm theo tên (A-Z hoặc Z-A)
      if (selectedSort === "asc") {
        productList.sort((a, b) => a.name.localeCompare(b.name));
      } else if (selectedSort === "desc") {
        productList.sort((a, b) => b.name.localeCompare(a.name));
      }

      setListProduct(productList);

      const response = await getPaginateProduct({
        listProduct: productList,
        page: 1,
        limit: 8,
      });

      setPaginatedProducts(response.data || []);
      setCurrentPage(1);
      setHasMore((response.totalPages || 0) > 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
    fetchListProduct();
    fetchBreedOptions();
  }, [
    type,
    inputSearch,
    selectedPrices,
    selectedBrands,
    selectedBreeds,
    selectedSort,
  ]);

  const priceOptions = [
    { label: "Dưới 20.000đ", value: "under_20000" },
    { label: "20.000đ-50.000đ", value: "20000_50000" },
    { label: "50.000đ-100.000đ", value: "50000_100000" },
    { label: "100.000đ-500.000đ", value: "100000_500000" },
    { label: "500.000đ-1.000.000đ", value: "500000_1000000" },
    { label: "1.000.000đ-5.000.000đ", value: "1000000_5000000" },
    { label: "5.000.000đ-10.000.000đ", value: "5000000_10000000" },
    { label: "Trên 10.000.000đ", value: "above_10000000" },
  ];

  const sortOptions = [
    { label: "Sắp xếp từ A-Z", value: "asc" },
    { label: "Sắp xếp từ Z-A", value: "desc" },
  ];

  const sortItems = sortOptions.map((option) => ({
    key: option.value,
    label: (
      <Checkbox
        checked={selectedSort === option.value}
        value={option.value}
        onChange={() => handleSortChange(option.value)}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  const handleSortChange = (value) => {
    setSelectedSort(value);
  };

  const brandOptions = filterOptions.map((option) => ({
    label: type === "pets" ? option.type_name : option.name,
    value: String(type === "pets" ? option.pet_type_id : option.category_id),
  }));

  const breedItems = breedOptions.map((breed) => ({
    key: breed,
    label: (
      <Checkbox
        checked={selectedBreeds.includes(breed)}
        value={breed}
        onChange={() => handleCheckboxChange(breed, "breed")}
      >
        {breed}
      </Checkbox>
    ),
  }));

  const handleCheckboxChange = (value, type) => {
    if (type === "price") {
      setSelectedPrices((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === "brand") {
      setSelectedBrands((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else if (type === "breed") {
      setSelectedBreeds((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    }
  };

  const priceItems = priceOptions.map((option) => ({
    key: option.value,
    label: (
      <Checkbox
        value={option.value}
        checked={selectedPrices.includes(option.value)}
        onChange={() => handleCheckboxChange(option.value, "price")}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  const brandItems = brandOptions.map((option) => ({
    key: option.value,
    label: (
      <Checkbox
        checked={selectedBrands.includes(option.value)}
        value={option.value}
        onChange={() => handleCheckboxChange(option.value, "brand")}
      >
        {option.label}
      </Checkbox>
    ),
  }));

  const loadMoreProducts = async () => {
    try {
      const response = await getPaginateProduct({
        listProduct,
        page: currentPage + 1,
        limit: 8,
      });

      const newProducts = response.data || [];
      setPaginatedProducts((prev) => [...prev, ...newProducts]);
      setCurrentPage((prev) => prev + 1);

      if (response.totalPages <= currentPage + 1) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    }
  };

  return (
    <div className="container my-10">
      <Helmet>
        <title>Danh mục</title>
      </Helmet>
      <div>
        <h3 className="text-[#522f1f] ml-3">
          {type === "pets" ? "Mua thú cưng" : "Mua đồ dùng cho thú cưng"}
        </h3>
      </div>
      <div className="flex gap-[50px] mt-4">
        <div className="mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            width="20"
            height="20"
            className="ml-2 mr-2"
          >
            <path
              fill="none"
              stroke="#522f1f"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="M12 9v8l-4-4V9L2 3h16z"
            ></path>
          </svg>
          <span>Bộ lọc</span>
        </div>
        <div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{ items: brandItems }}
                placement="bottomLeft"
                trigger={["hover"]}
              >
                <Button className="mr-12 pr-[100px] py-[20px] rounded-none font-medium text-sm">
                  {type === "pets" ? "Lọc loại thú cưng" : "Lọc danh mục"}
                </Button>
              </Dropdown>
              <Dropdown
                menu={{ items: priceItems }}
                placement="bottomLeft"
                trigger={["hover"]}
              >
                <Button className="mr-4 pr-[150px] py-[20px] rounded-none font-medium text-sm">
                  Lọc giá
                </Button>
              </Dropdown>
              {type === "pets" && (
                <Dropdown
                  menu={{ items: breedItems }}
                  placement="bottomLeft"
                  trigger={["hover"]}
                  className="ml-8"
                >
                  <Button className="mr-4 pr-[150px] py-[20px] rounded-none font-medium text-sm">
                    Lọc giống thú cưng
                  </Button>
                </Dropdown>
              )}
              <Dropdown
                menu={{ items: sortItems }}
                placement="bottomLeft"
                trigger={["hover"]}
                className="ml-8"
              >
                <Button className="mr-4 pr-[150px] py-[20px] rounded-none font-medium text-sm">
                  Sắp xếp theo tên
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </div>
      </div>
      <div>
        <Product_Carts paginatedProducts={paginatedProducts} />
      </div>
      <div className="flex align-items-center justify-center">
        <ButtonSeeMore onClick={loadMoreProducts} disabled={!hasMore} />
      </div>
    </div>
  );
};

export default Category_Product;
