function generateReports() {
	console.log("generateReports() called");

	reportingPromise('reporting').then(
		function(resolve) {
			console.log("reportingPromise:Success");
		}
	).catch(
		function(reject) {
			console.log("reportingPromise:Fail");
		}
	).finally(
		function() {
			console.log("reportingPromise:Moving On.");
		}
	);
}