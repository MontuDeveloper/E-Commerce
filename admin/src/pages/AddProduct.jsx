import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaCloudUploadAlt } from "react-icons/fa";

import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pCategory/pcategorySlice";
import { getColors } from "../features/color/colorSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { delImg, uploadonImg } from "../features/upload/uploadSlice";

const validationSchema = Yup.object({
  title: Yup.string().required("Product name is required"),
  // description: Yup.string().required("Product description is required"),
  sku: Yup.string().required("Product sku is required"),
  price: Yup.number()
    .required("Product price is required")
    .positive("Price must be a positive number"),
  quantity: Yup.number()
    .required("Product stock quantity is required")
    .integer("Stock must be a whole number")
    .positive("Stock quantity must be positive"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  color: Yup.string().required("Color is Required"),
  tags: Yup.string().required("Tag is Required"),
});

const sizeOptions = [
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
  {
    label: "XXL",
    value: "xxl",
  },
];

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seletedSize, setseletedSize] = useState([]);
  const [disc, setDisc] = useState("");

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCatagories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfullly!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const handleImageUpload = async (acceptedFiles) => {
    dispatch(uploadonImg(acceptedFiles));
  };

  const handleSize = (e) => {
    setseletedSize(e);
  };

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  const handleSubmit = async (values) => {
    const productData = {
      ...values,
      images: img,
      size: seletedSize,
      description: disc,
    };

    dispatch(createProducts(productData));
    dispatch(resetState);

    setTimeout(() => {
      navigate("/admin/list-product");
    }, 300);
  };

  return (
    <div>
      <h2>Add a Product</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          sku: "",
          price: 0,
          quantity: 0,
          category: "",
          color: "",
          tags: "",
          size: [],
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div className="row g-5">
              <div className="col-12 col-xl-8">
                <div className="mb-5">
                  <h4 className="mb-3">Product Title</h4>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Product Name"
                    className="form-control border border-dark"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="mb-4" style={{ height: "auto" }}>
                  <h4 className="mb-3">Product Description</h4>

                  <ReactQuill
                    theme="snow"
                    name="description"
                    onChange={(e) => {
                      setDisc(e);
                    }}
                    value={disc}
                    placeholder="write a description here..."
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>

                <h4 className="mb-4">Display images</h4>

                <div className="image-preview">
                  {img.map((image, i) => {
                    return (
                      <div
                        key={i}
                        className=" position-relative me-2 mb-2 d-flex flex-center rounded-3 border overflow-hidden"
                        style={{
                          borderColor: "rgba(203, 208, 221, 0.54)",
                          height: "150px",
                          width: "auto",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => dispatch(delImg(i.public_id))}
                          className="btn-close position-absolute"
                          style={{ top: "5px", right: "5px" }}
                        ></button>
                        <img
                          draggable="false"
                          src={image.url}
                          alt="Product"
                          className="object-contain"
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mb-5 text-center">
                  <Dropzone onDrop={handleImageUpload} value={values.images}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                          <div>
                            <FaCloudUploadAlt style={{ fontSize: "30px" }} />
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>

                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title mb-4">More</h4>
                    <div className="row gx-3">
                      <div className="col-12 col-sm-6 col-xl-6">
                        <div className="mb-4">
                          <div className="mb-2">
                            <h5 className="mb-0">Price</h5>
                          </div>
                          <div className="mb-3">
                            <Field
                              type="number"
                              name="price"
                              placeholder="Product Price"
                              className="form-control border border-dark"
                            />
                            <ErrorMessage
                              name="price"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6 col-xl-6">
                        <div className="mb-4">
                          <div className="mb-2">
                            <h5 className="mb-0">Stock</h5>
                          </div>
                          <div className="mb-3">
                            <Field
                              type="number"
                              name="quantity"
                              placeholder="Product Stock"
                              className="form-control border border-dark"
                            />
                            <ErrorMessage
                              name="quantity"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-xl-6">
                        <div className="mb-4">
                          <div className="mb-2">
                            <h5 className="mb-0">SKU</h5>
                          </div>
                          <div className="mb-3">
                            <Field
                              type="text"
                              name="sku"
                              placeholder="Product Sku"
                              className="form-control border border-dark"
                            />
                            <ErrorMessage
                              name="sku"
                              component="div"
                              className="error"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg"
                  >
                    {isSubmitting ? "Adding Product..." : "Add Product"}
                  </button>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="row g-2">
                  <div className="col-12 col-xl-12">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h4 className="card-title mb-4">Organize</h4>
                        <div className="row gx-3">
                          <div className="col-12 col-sm-6 col-xl-12">
                            <div className="mb-4">
                              <div className="mb-2">
                                <h5 className="mb-0">Category</h5>
                              </div>
                              <div className="mb-3">
                                <Field
                                  as="select"
                                  name="category"
                                  value={values.category}
                                  className="form-control border border-dark"
                                >
                                  <option>-- Select Category --</option>
                                  {catState.map((i, j) => (
                                    <option key={j} value={i.title}>
                                      {i.title}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-6 col-xl-12">
                            <div className="mb-4">
                              <div className="mb-2">
                                <h5 className="mb-0">Brand</h5>
                              </div>
                              <div className="mb-3">
                                <Field
                                  as="select"
                                  name="brand"
                                  value={values.brand}
                                  className="form-control border border-dark"
                                >
                                  <option>-- Select brand --</option>
                                  {brandState.map((i, j) => (
                                    <option key={j} value={i.title}>
                                      {i.title}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-xl-12">
                            <div className="mb-4">
                              <div className="mb-2">
                                <h5 className="mb-0">Tags</h5>
                              </div>
                              <div className="mb-3">
                                <Field
                                  component="select"
                                  name="tags"
                                  placeholder="Select Category"
                                  className="form-control border border-dark"
                                >
                                  <option>-- Select Tags --</option>

                                  <option value="featured">featured</option>
                                  <option value="popular">popular</option>
                                  <option value="special">special</option>
                                  <option value="New-Arrivals">
                                    New Arrivals
                                  </option>
                                </Field>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-12">
                    <div className="card">
                      <div className="card-body">
                        <h4 className="mb-4">Variants</h4>
                        <div className="row g-3">
                          <div className="col-12 col-sm-6 col-xl-12">
                            <div className="mb-4">
                              <div className="mb-2">
                                <h5 className="mb-0">Size</h5>
                              </div>
                              <div className="mb-3">
                                <div className="">
                                  <Select
                                    mode="multiple"
                                    style={{
                                      width: "100%",
                                    }}
                                    placeholder="select Size"
                                    onChange={handleSize}
                                    options={sizeOptions}
                                    optionRender={(option) => (
                                      <Space>
                                        <span
                                          role="img"
                                          aria-label={option.data.label}
                                        >
                                          {option.data.label}
                                        </span>
                                      </Space>
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-12 col-sm-6 col-xl-12">
                            <div className="mb-4">
                              <div className="mb-2">
                                <h5 className="mb-0">Color</h5>
                              </div>
                              <div className="mb-3">
                                <div className="">
                                  <Field
                                    as="select"
                                    name="color"
                                    value={values.color}
                                    className="form-control border border-dark"
                                  >
                                    <option>-- Select Color --</option>
                                    {colorState.map((i, j) => (
                                      <option key={j} value={i.title}>
                                        {i.title}
                                      </option>
                                    ))}
                                  </Field>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
