import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GrCatalog } from "react-icons/gr";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCircleList } from "react-icons/ci";
import { SiBrandfolder } from "react-icons/si";
import { IoListCircle } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { FaJediOrder } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-white fs-5 text-center py-3 mb-0">Valodna</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <MdDashboard />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <GrCatalog />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineProduct />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <CiCircleList />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <IoListCircle />,
                  label: "Brand List ",
                },
                {
                  key: "category",
                  icon: <TbCategoryPlus />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <CiCircleList />,
                  label: "Category List",
                },
                {
                  key: "color",
                  icon: <IoMdColorPalette />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <CiCircleList />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaJediOrder />,
              label: "Orders",
            },
            {
              key: "marketing",
              icon: <FaJediOrder />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <FaJediOrder />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <FaJediOrder />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
              icon: <FaJediOrder />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <FaJediOrder />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaJediOrder />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <FaJediOrder />,
                  label: "Add Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <FaJediOrder />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <FaJediOrder />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="d-flex justify-content-between ps-3 pe-5"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-3" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=626&ext=jpg&ga=GA1.1.1719940558.1708329459&semt=ais_user"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Montu akabri</h5>
                <p className="mb-0">admin</p>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
