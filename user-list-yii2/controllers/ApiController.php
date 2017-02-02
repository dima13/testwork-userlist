<?

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use app\models\Country;

class ApiController extends Controller {	
	public function behaviors() {
	    $behaviors = parent::behaviors();

	    $behaviors['corsFilter' ] = [
            'class' => \yii\filters\Cors::className(),
        ];

	    $format = [
	    	'application/json' => \yii\web\Response::FORMAT_JSON
	    ];
	    if(Yii::$app->request->get('xml') == 1) {
	    	$format = [
	    		'application/xml' => \yii\web\Response::FORMAT_XML
	    	];
	    }

		$behaviors['contentNegotiator'] = [
		    'class' => \yii\filters\ContentNegotiator::className(),
		    'formats' => $format,
		];
	    return $behaviors;
	}

	public function beforeAction($action) {
        $this->enableCsrfValidation = false;

		if(file_get_contents('php://input')) {
			$formData = json_decode(file_get_contents('php://input')) ?? [];
		    foreach ($formData as $key=>$value) {
		        $_POST[$key]=$value;
		    }
		}
        return parent::beforeAction($action);
    } 


    public function actionUserList() {
    	$order = Yii::$app->request->get('order');
    	$fio = Yii::$app->request->get('fio');

    	$usersFind = User::find()->with('country'); 
    	if($fio) {
    		$usersFind->where(['like', 'fio', $fio]);
    	}

    	if($order == '1') {
    		$usersFind->orderBy("fio");
    	} else {
    		$usersFind->orderBy("fio DESC");
    	}

    	$users = $usersFind->asArray()->all();
    	return $users;
    }

    public function actionCountryList() {
    	$countries = Country::find()->all();
    	return $countries;
    }

    public function actionUserSave() {
    	$request = Yii::$app->request;
    	$userId = $request->get('id');
    	$user = User::findOne($userId);
    	if($user) {
    		$user->fio = $request->post('fio');
    		$user->phone = $request->post('phone');
    		$user->countryId = $request->post('country')->{'id'};
    		return $user->save();
    	} else {
    		return 0;
    	}
    }

    public function actionNewUser() {
    	$request = Yii::$app->request;
    	$user = new User();
		$user->fio = $request->post('fio');
		$user->phone = $request->post('phone');
		$user->countryId = $request->post('country')->{'id'};
		if($user->save()) {
			return $user->id;
		} else {
			return false;
		}
    }

}