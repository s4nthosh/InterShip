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
        insertUser($data);
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


function insertUser($data) {
    global $conn;
    if (!isset($data['interName']) || !isset($data['email'])) {
        throw new Exception("All fields are required");
    }
    $id = uniqid();

    $sql = 'INSERT INTO form(Id,Name, Email,Address,City,State,PinCode,Country,Phone,College,PursingDegree,ProjectTopic,ApplicationDate,BeginDate,EndDate,ResumeBonafide,PrjReleventExp,TotalAmount,StudentPursing,ModeofPayment,MethodOfPayment,OnlineAmount,Amount,bonafideFile,RemainingAmount) 
            VALUES(:id,:interName, :email,:address,:city,:state,:pincode,:country,:phone,:collegeName,:pursingDegree,:topicPrj,:applicationDate,:beginDate,:endDate,:selectedValue,:projectExp,:totalAmount,:selectedOption,:mode,:Paymentmode,:onlineAmount,:amount,:selectedFileName,:remainingAmount)';

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id',$id);
    $stmt->bindParam(':interName', $data['interName']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':address',$data['address']);
    $stmt->bindParam(':city',$data['city']);
    $stmt->bindParam(':state',$data['state']);
    $stmt->bindParam(':pincode',$data['pincode']);
    $stmt->bindParam(':country',$data['country']);
    $stmt->bindParam(':phone',$data['phone']);
    $stmt->bindParam(':collegeName',$data['collegeName']);
    $stmt->bindParam(':pursingDegree',$data['pursingDegree']);
    $stmt->bindParam(':topicPrj',$data['topicPrj']);
    $stmt->bindParam(':applicationDate',$data['applicationDate']);
    $stmt->bindParam(':beginDate',$data['beginDate']);
    $stmt->bindParam(':endDate',$data['endDate']);
    $stmt->bindParam(':selectedValue',$data['selectedValue']);
    $stmt->bindParam(':totalAmount',$data['totalAmount']);
    $stmt->bindParam(':Paymentmode',$data['Paymentmode']);
    $stmt->bindParam(':onlineAmount',$data['onlineAmount']);
    $stmt->bindParam(':amount',$data['amount']);
    $stmt->bindParam(':selectedOption',$data['selectedOption']);
    $stmt->bindParam(':projectExp',$data['projectExp']);
    $stmt->bindParam(':mode',$data['mode']);
    $stmt->bindParam(':selectedFileName',$data['selectedFileName']);
    $stmt->bindParam(':remainingAmount',$data['remainingAmount']);
    



    if ($stmt->execute()) {
        echo json_encode([
            'message' => "Data Inserted Successfully"
        ]);
    } else {
        throw new Exception("Failed to Insert data");
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


function updateUser($data){

    global $conn;
    try{

        if (!isset($data['Id']) || !isset($data['interName']) || !isset($data['city'])) {
            throw new Exception("All fields (Id, Name, city,email) are required for updating");
        }
        $Id = $data['Id'];
        $Name = $data['interName'];
        $City = $data['city'];
        $Email = $data['email'];
        $Address = $data['address'];
        $State = $data['state'];
        $PinCode =$data['pincode'];
        $Country = $data['country'];
        $Phone = $data['phone'];
        $College = $data['college'];
        $PursingDegree =$data['pursingDegree'];
        $ProjectTopic=$data['topicPrj'];
        $ResumeBonafide=$data['selectedValue'];
        $BeginDate=$data['beginDate'];
        $EndDate=$data['endDate'];
        $ApplicationDate =$data['applicationDate'];
        $TotalAmount = $data['TotalAmount'];
        $ModeofPayment=$data['mode'];
        $MethodOfPayment=$data['paymentmode'];
        $Amount=$data['amount'];
        $OnlineAmount=$data['onlineAmount'];
        $RemainingAmount=$data['remainingAmount'];
        $PrjReleventExp=$data['projectExp'];
        $StudentPursing=$data['selectedOption'];

        //selectedFile

        
        $sql = "UPDATE form SET Name = :intername,City = :city, Email = :email, Address = :address,State = :state,PinCode = :pincode, Country = :country ,Phone=:phone, College = :college ,PursingDegree=:pursingDegree ,ProjectTopic= :topicPrj,ResumeBonafide= :selectedValue ,BeginDate= :beginDate,EndDate=:endDate,ApplicationDate=:applicationDate ,TotalAmount =:TotalAmount,ModeofPayment =:mode,MethodOfPayment=:paymentmode,Amount=:amount,OnlineAmount=:onlineAmount,RemainingAmount = :remainingAmount,PrjReleventExp=:projectExp,StudentPursing=:selectedOption WHERE Id = :Id"; 
        $stmt = $conn->prepare($sql);
        $stmt->bindparam(':Id',$Id,PDO::PARAM_STR);
        $stmt->bindparam(':intername',$Name,PDO::PARAM_STR);
        $stmt->bindparam(':city',$City,PDO::PARAM_STR);
        $stmt->bindparam(':email',$Email,PDO::PARAM_STR);
        $stmt->bindparam(':address',$Address,PDO::PARAM_STR);
        $stmt->bindparam(':state',$State,PDO::PARAM_STR);
        $stmt->bindparam(':pincode',$PinCode,PDO::PARAM_STR);
        $stmt->bindparam(':country',$Country,PDO::PARAM_STR);
        $stmt->bindparam(':phone',$Phone,PDO::PARAM_STR);
        $stmt->bindparam(':college',$College,PDO::PARAM_STR);
        $stmt->bindparam(':pursingDegree',$PursingDegree,PDO::PARAM_STR);
        $stmt->bindparam(':topicPrj',$ProjectTopic,PDO::PARAM_STR);
        $stmt->bindparam(':selectedValue',$ResumeBonafide,PDO::PARAM_STR);
        $stmt->bindparam(':beginDate',$BeginDate,PDO::PARAM_STR);
        $stmt->bindparam(':endDate',$EndDate,PDO::PARAM_STR);
        $stmt->bindparam(':applicationDate',$ApplicationDate,PDO::PARAM_STR);
        $stmt->bindparam(':TotalAmount',$TotalAmount,PDO::PARAM_STR);
        $stmt->bindparam(':mode',$ModeofPayment,PDO::PARAM_STR);
        $stmt->bindparam(':paymentmode',$MethodOfPayment,PDO::PARAM_STR);
        $stmt->bindparam(':amount',$Amount,PDO::PARAM_STR);
        $stmt->bindparam(':onlineAmount',$OnlineAmount,PDO::PARAM_STR);
        $stmt->bindparam(':remainingAmount',$RemainingAmount,PDO::PARAM_STR);
        $stmt->bindparam(':projectExp',$PrjReleventExp,PDO::PARAM_STR);
        $stmt->bindparam(':selectedOption',$StudentPursing,PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "User updated successfully"]);
        } else {
            echo json_encode(["error" => "User not found or no changes made"]);
        }
    }
    catch(PDOException $e){
        echo json_encode(["error"=>$e->getMessage()]);
    }
};


function deleteUser($Id){
    global $conn;
    try{
        $sql = "DELETE FROM form WHERE Id= :Id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':Id', $Id, PDO::PARAM_STR);
        $stmt->execute();
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "User deleted successfully"]);
        } else {
            echo json_encode(["error" => "User not found"]);
        }
    }
    catch(PDOException $e){
        echo json_encoden(["error"=>$e->getMessage()]);
    };
};


