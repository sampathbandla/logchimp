<template>
	<div class="dashboard">
		<aside>
			<Sidebar />
		</aside>
		<main class="dashboard-main">
			<router-view />
		</main>
	</div>
</template>

<script>
// components
import Sidebar from "../components/dashboard/Sidebar";

export default {
	name: "DashboardLayout",
	components: {
		Sidebar
	}
};
</script>

