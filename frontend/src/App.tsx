import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import './App.css';

import { Redirect, Router } from '@reach/router';
import { useSigninCheck } from 'reactfire';

import AddClientPage from 'pages/Clients/AddClientPage';
import AddProductPage from 'pages/Products/AddProductPage';
import { Box } from '@mui/material';
import CheckoutHomePage from 'pages/Checkout/CheckoutHomePage';
import CheckoutPage from 'pages/Checkout/CheckoutPage';
import ClientsHomePage from 'pages/Clients/ClientsHomePage';
import ClientsPage from 'pages/Clients/ClientsPage';
import EditClientPage from 'pages/Clients/EditClientPage';
import EditProductPage from 'pages/Products/EditProductPage';
import EditUserPage from 'pages/Users/EditUserPage';
import Home from 'pages/Home';
import LoginPage from 'pages/Auth/LoginPage';
import LogoutPage from 'pages/Auth/LogoutPage';
import POSAppBar from 'components/AppBar';
import ProductsHomePage from 'pages/Products/ProductsHomePage';
import ProductsPage from 'pages/Products/ProductsPage';
import { ToastContainer } from 'react-toastify';
import UsersHomePage from 'pages/Users/UsersHomePage';
import UsersPage from 'pages/Users/UsersPage';
import ReportsPage from 'pages/Reports/ReportsPage';
import ReportsHomePage from 'pages/Reports/ReportsHomePage';

function App() {
	const { status: isSignedInStatus, data: signinCheck } = useSigninCheck({
		// @ts-ignore
		requiredClaims: { admin: true },
	});

	const { signedIn, hasRequiredClaims: isAdmin } = signinCheck || {};
	console.log('isAdmin', isAdmin);

	return isSignedInStatus !== 'loading' ? (
		<Box>
			<POSAppBar />
			<Router>
				{signedIn && (
					<>
						<Home path='/' />
						<ProductsPage path='products'>
							<ProductsHomePage path='/' />
							<EditProductPage path=':id/edit' />
							<AddProductPage path='new' />
						</ProductsPage>

						<ClientsPage path='clients'>
							<ClientsHomePage path='/' />
							<EditClientPage path=':id/edit' />
							<AddClientPage path='new' />
						</ClientsPage>

						<CheckoutPage path='checkout'>
							<CheckoutHomePage path='/' />
						</CheckoutPage>

						<UsersPage path='users' isAdmin={isAdmin}>
							<UsersHomePage path='/' />
							<EditUserPage path=':id/edit' />
						</UsersPage>

						<ReportsPage path='reports' isAdmin={isAdmin}>
							<ReportsHomePage path='/' />
						</ReportsPage>

						<LogoutPage path='logout' />
						<Redirect from='/login' to='/' noThrow />
					</>
				)}

				{!signedIn && (
					<>
						<Redirect from='*' to='/login' noThrow />
						<LoginPage path='login' />
					</>
				)}
			</Router>
			<ToastContainer position='top-right' />
		</Box>
	) : (
		<></>
	);
}

export default App;

