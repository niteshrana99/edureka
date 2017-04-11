(function () {
	angular.module("app", []).controller("mainController", function ($scope, $http) {

		$scope.employees = [];

		$scope.empObj = {
			name: "",
			email: "",
			DOB: "",
			dept: "",
			gender: "",
			age: ""
		};

		var pattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
		//get collection list
		$scope.getAllEmployees = function () {
			$http.get("/getAllEmployees").success(function (x, y, z) {
				$scope.employees = x;
			})
		};
		$scope.getAllEmployees();

		//update user details
		$scope.createEmployeeDetails = function () {

			if (($scope.empObj.name != "") && pattern.test($scope.empObj.email) && ($scope.empObj.DOB != "") && ($scope.empObj.dept != "") && ($scope.empObj.gender != "")) {

				$http({ url: "/createAEmployee", method: "POST", data: $scope.empObj }).success(function (x, y, z) {
					$scope.employees.push(x);
					$scope.empObj = {
						name: "",
						email: "",
						dob: "",
						dept: "",
						gender: "",
						age: ""
					};
				}).error(function (err) {
					console.log("error in creating a employee details", err);
				})

			}

		};
		$scope.modifyEmployeeDetails = function (employee) {
			$scope.showUpdateButton = true;
			$scope.empObj = {
				_id: employee._id,
				name: employee.name,
				email: employee.email,
				DOB: new Date(employee.DOB),
				dept: employee.dept,
				gender: employee.gender,
				age: employee.age
			};
		};

		$scope.updateUser = function () {

			$scope.showUpdateButton = false;
			if (($scope.empObj.name != "") && pattern.test($scope.empObj.email) && ($scope.empObj.DOB != "") && ($scope.empObj.dept != "") && ($scope.empObj.gender != "")) {

				$http({ url: "/updateAEmployee/" + $scope.empObj._id, method: "PUT", data: $scope.empObj }).success(function () {
					$scope.getAllEmployees();
					$scope.empObj = {
						name: "",
						email: "",
						DOB: "",
						dept: "",
						gender: "",
						age: ""
					};
				}).error(function (err) {
					console.log("error in updating", err);
				})
			}
		};


		//delete user from collection
		$scope.deleteEmployeeDetails = function (employee) {
			$http({ url: "/deleteAEmployee/" + employee._id, method: "DELETE", data: employee }).success(function (x,y,z) {
				$scope.getAllEmployees();
			}).error(function (err) {
				console.log("error in deleting", err);
			})

		};
		//calculate age
		$scope.calculateAge = function (dob) {
			var birthDate = new Date(dob);
			var presentDate = new Date();
			var age = presentDate.getFullYear() - birthDate.getFullYear();

			if (presentDate.getFullYear() - birthDate.getFullYear() > 0) {
				if (presentDate.getMonth() - birthDate.getMonth() == 0) {
					if (presentDate.getDate() - birthDate.getDate() < 0) {
						age = age - 1;
					}
				}
				else if (presentDate.getMonth() - birthDate.getMonth() < 0) {
					age = age - 1;
				}
			}
			else {
				//error msg
			}
	
			$scope.empObj.age = age;
		}

	})
})();