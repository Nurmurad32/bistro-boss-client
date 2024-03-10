import { Helmet } from 'react-helmet-async';
import Cover from '../../Home/Shared/Cover/Cover';
import orderCoverImg from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from "react-router-dom";

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const {category} = useParams();
    const initialIndex = categories.indexOf(category)

    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    
    console.log(category)
    const dessert = menu && menu.filter(item => item.category === 'dessert')
    const soup = menu && menu.filter(item => item.category === 'soup')
    const salad = menu && menu.filter(item => item.category === 'salad')
    const pizza = menu && menu.filter(item => item.category === 'pizza')
    const drinks = menu && menu.filter(item => item.category === 'drinks')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Order</title>
            </Helmet>
            <Cover img={orderCoverImg} title={"Order Food"}></Cover>

            <div className='max-w-screen-xl mx-auto my-16'> 
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className="text-center mb-8" style={{borderBottom:"none"}}>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Dessert</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>
            </div>

        </div>
    );
};

export default Order;