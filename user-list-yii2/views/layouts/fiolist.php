<?php
use yii\helpers\Html;
use app\assets\AppAsset;

AppAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?= Html::encode($this->title) ?></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?= Html::csrfMetaTags() ?>
		<?php $this->head() ?>
	</head>

	<body>
	<?php $this->beginBody() ?>
    	<?= $content ?>
	<?php $this->endBody() ?>

	</body>
</html>
<?php $this->endPage() ?>
