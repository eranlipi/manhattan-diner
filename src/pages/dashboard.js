import React from "react";
import Dashboard from "./components/Dashboard";

const DashboardPage = (props) => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;

export async function getStaticProps(context) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../../messages/${context.locale}.json`)).default
    }
  };
}
