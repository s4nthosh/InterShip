<?php
include 'Connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

try{
    $data=json_decode(file_get_contents("php://input"),true); 
    
    if($method === "POST"){
        insertUser($_POST + $_FILES);
    }
    else if($method ==="GET"){
        getUsers($data);
    }
    else if($method === 'PUT'){
        if(isset($data['Id'])){
            $Id = $data['Id'];
            updateUser($data);
        }
        else{
            echo json_encode(["error"=>"Id not Found for Updating"]);
        };
    }
    else if($method==="DELETE"){
        if(isset($data['Id'])){
            $Id = $data['Id'];
            deleteUser($Id);
        }
        else{
            echo json_encode(["error"=>"Id is required for deleting"]);
        }
        
    }
    else{
        throw new Exception("Invalid request method:$method");
    };
    
}
catch(PDOException $e){
    echo "Connection Failed:". $e->getMessage();
}; 

$conn=null;

function insertUser() {
    global $conn;

    try {
        $fileName = null;

        // Handle file upload
        if (isset($_FILES['selectedFile']) && $_FILES['selectedFile']['error'] === UPLOAD_ERR_OK) {
            $fileTmp = $_FILES['selectedFile']['tmp_name'];
            $fileName = uniqid() . '_' . $_FILES['selectedFile']['name']; // Add a unique prefix to avoid overwriting
            $uploadDir = __DIR__ . '/resume/';

            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $filePath = $uploadDir . $fileName;
            if (!move_uploaded_file($fileTmp, $filePath)) {
                throw new Exception("Failed to upload file");
            }
        }

        // Validate required fields
        if (!isset($_POST['interName']) || !isset($_POST['email'])) {
            throw new Exception("All fields are required");
        }

        $id = uniqid();

        // SQL query to insert data
        $sql = 'INSERT INTO form(Id, Name, Email, Address, City, State, PinCode, Country, Phone, College, PursingDegree, ProjectTopic, ApplicationDate, BeginDate, EndDate, ResumeBonafide, PrjReleventExp, TotalAmount, StudentPursing, ModeofPayment, MethodOfPayment, OnlineAmount, Amount, bonafideFile, RemainingAmount) 
                VALUES(:id, :interName, :email, :address, :city, :state, :pincode, :country, :phone, :collegeName, :pursingDegree, :topicPrj, :applicationDate, :beginDate, :endDate, :selectedValue, :projectExp, :totalAmount, :selectedOption, :mode, :Paymentmode, :onlineAmount, :amount, :selectedFileName, :remainingAmount)';

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':interName', $_POST['interName']);
        $stmt->bindParam(':email', $_POST['email']);
        $stmt->bindParam(':address', $_POST['address']);
        $stmt->bindParam(':city', $_POST['city']);
        $stmt->bindParam(':state', $_POST['state']);
        $stmt->bindParam(':pincode', $_POST['pincode']);
        $stmt->bindParam(':country', $_POST['country']);
        $stmt->bindParam(':phone', $_POST['phone']);
        $stmt->bindParam(':collegeName', $_POST['collegeName']);
        $stmt->bindParam(':pursingDegree', $_POST['pursingDegree']);
        $stmt->bindParam(':topicPrj', $_POST['topicPrj']);
        $stmt->bindParam(':applicationDate', $_POST['applicationDate']);
        $stmt->bindParam(':beginDate', $_POST['beginDate']);
        $stmt->bindParam(':endDate', $_POST['endDate']);
        $stmt->bindParam(':selectedValue', $_POST['selectedValue']);
        $stmt->bindParam(':totalAmount', $_POST['totalAmount']);
        $stmt->bindParam(':Paymentmode', $_POST['Paymentmode']);
        $stmt->bindParam(':onlineAmount', $_POST['onlineAmount']);
        $stmt->bindParam(':amount', $_POST['amount']);
        $stmt->bindParam(':selectedOption', $_POST['selectedOption']);
        $stmt->bindParam(':projectExp', $_POST['projectExp']);
        $stmt->bindParam(':mode', $_POST['mode']);
        $stmt->bindParam(':selectedFileName', $fileName); // Save the uploaded file name
        $stmt->bindParam(':remainingAmount', $_POST['remainingAmount']);

        // Execute the query
        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => "Data inserted successfully"
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => "Failed to insert data"
            ]);
        }
    } catch (Exception $e) {
        // Handle exceptions and return error response
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
}



function getUsers($data){
    global $conn;
    try {
        $sql = "SELECT * FROM form";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($users); 
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
};


function updateUser($data) {
    global $conn;

    try {
        
        if (!isset($data['Id']) || !isset($data['interName']) || !isset($data['city'])) {
            throw new Exception("All fields (Id, Name, city, email) are required for updating");
        }

        $Id = $data['Id'];
        $Name = $data['interName'];
        $City = $data['city'];
        $Email = $data['email'];
        $Address = $data['address'];
        $State = $data['state'];
        $PinCode = $data['pincode'];
        $Country = $data['country'];
        $Phone = $data['phone'];
        $College = $data['college'];
        $PursingDegree = $data['pursingDegree'];
        $ProjectTopic = $data['topicPrj'];
        $ResumeBonafide = $data['selectedValue'];
        $BeginDate = $data['beginDate'];
        $EndDate = $data['endDate'];
        $ApplicationDate = $data['applicationDate'];
        $TotalAmount = $data['TotalAmount'];
        $ModeofPayment = $data['mode'];
        $MethodOfPayment = $data['paymentmode'];
        $Amount = $data['amount'];
        $OnlineAmount = $data['onlineAmount'];
        $RemainingAmount = $data['remainingAmount'];
        $PrjReleventExp = $data['projectExp'];
        $StudentPursing = $data['selectedOption'];

        
        $fileName = null;
        if (isset($_FILES['selectedFile']) && $_FILES['selectedFile']['error'] === UPLOAD_ERR_OK) {
            $fileTmp = $_FILES['selectedFile']['tmp_name'];
            $fileName = uniqid() . '_' . $_FILES['selectedFile']['name'];
            $uploadDir = __DIR__ . '/resume/';

            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true); 
            }

            $filePath = $uploadDir . $fileName;

            
            if (!move_uploaded_file($fileTmp, $filePath)) {
                throw new Exception("Failed to upload file");
            }

        
            if (!empty($data['previousFile'])) {
                $previousFilePath = $uploadDir . $data['previousFile'];
                if (file_exists($previousFilePath)) {
                    unlink($previousFilePath);
                }
            }
        } else {
            $fileName = $data['previousFile'];
        }


        $sql = "UPDATE form 
                SET Name = :intername, City = :city, Email = :email, Address = :address, State = :state, 
                    PinCode = :pincode, Country = :country, Phone = :phone, College = :college, 
                    PursingDegree = :pursingDegree, ProjectTopic = :topicPrj, ApplicationDate = :applicationDate, 
                    BeginDate = :beginDate, EndDate = :endDate, ResumeBonafide = :selectedValue, 
                    PrjReleventExp = :projectExp, TotalAmount = :totalAmount, StudentPursing = :selectedOption, 
                    ModeofPayment = :mode, MethodOfPayment = :paymentmode, OnlineAmount = :onlineAmount, 
                    Amount = :amount, bonafideFile = :selectedFile, RemainingAmount = :remainingAmount 
                WHERE Id = :id";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $Id);
        $stmt->bindParam(':intername', $Name);
        $stmt->bindParam(':city', $City);
        $stmt->bindParam(':email', $Email);
        $stmt->bindParam(':address', $Address);
        $stmt->bindParam(':state', $State);
        $stmt->bindParam(':pincode', $PinCode);
        $stmt->bindParam(':country', $Country);
        $stmt->bindParam(':phone', $Phone);
        $stmt->bindParam(':college', $College);
        $stmt->bindParam(':pursingDegree', $PursingDegree);
        $stmt->bindParam(':topicPrj', $ProjectTopic);
        $stmt->bindParam(':applicationDate', $ApplicationDate);
        $stmt->bindParam(':beginDate', $BeginDate);
        $stmt->bindParam(':endDate', $EndDate);
        $stmt->bindParam(':selectedValue', $ResumeBonafide);
        $stmt->bindParam(':totalAmount', $TotalAmount);
        $stmt->bindParam(':mode', $ModeofPayment);
        $stmt->bindParam(':paymentmode', $MethodOfPayment);
        $stmt->bindParam(':amount', $Amount);
        $stmt->bindParam(':onlineAmount', $OnlineAmount);
        $stmt->bindParam(':remainingAmount', $RemainingAmount);
        $stmt->bindParam(':projectExp', $PrjReleventExp);
        $stmt->bindParam(':selectedOption', $StudentPursing);
        $stmt->bindParam(':selectedFile', $fileName);

        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => "User updated successfully",
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => "User not found or no changes made",
            ]);
        }
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage(),
        ]);
    }
}


function deleteUser($Id){
    global $conn;
    try{
        $sql = "DELETE FROM form WHERE Id= :Id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Id', $Id, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => "User deleted successfully"
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => "User not found"
            ]);
        }
    }
    catch(PDOException $e){
        echo json_encoden(["error"=>$e->getMessage()]);
    };
};


