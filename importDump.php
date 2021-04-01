<?php

/*
 * Quick and experimental Craft MySQL backup importer; use at your own risk!
 */

$dbSettings = include "craft/config/db.php";
$sockets    = array(
	'', // empty socket; leave this here to try default
	'/tmp/mysql.sock', // Unix default
	'/Applications/MAMP/tmp/mysql/mysql.sock', // MAMP
);

$connectSocket = '';
$success       = false;

echo "\nStarting Craft dump import attempt.\n\n";

/*
 * Since we're running from command line, try each set of credentials to find a match
 */

foreach ($dbSettings as $settings)
{

	if ( ! empty($settings['user']) and 
		 ! empty($settings['password']) and 
		 ! empty($settings['database']) and
		 ! empty($settings['server']) and 
		 $success === false
	)
	{
		foreach ($sockets as $socket)
		{
			echo "Trying {$settings['database']} at {$settings['server']} as {$settings['user']} on ".( !empty($socket) ? $socket : 'default socket')." ... ";

			$connect = @mysqli_connect(
							$settings['server'], 
							$settings['user'], 
							$settings['password'], 
							$settings['database'], 
							3306, 
							! empty($socket) ? $socket : null
						);

			if (mysqli_connect_errno())
			{
				echo "failed.\n";
			}
			else
			{
				$connectSocket = $socket;
				$success = true;
				
				echo "success!\n";
				
				echo "Backing up local database ... ";
				exec('mysqldump -u '.$settings['user'].' --password='.$settings['password'].' '.$settings['database'].' > '.$settings['database'].'-'.time().'.sql');
				echo "done.\n";

				echo "Finding latest dump ... ";

				$latest = '';

				foreach (glob("craft/storage/backups/*.sql") as $filename)
				{
				    $latest = $filename;
				}

				echo $latest."\n";

				echo "Attempting to import dump ... ";
				$importCommand = 'mysql -u '.$settings['user'].' --password='.$settings['password'].' -h '.$settings['server'].' '.$settings['database'].' < '.$latest;
				//echo $importCommand;
				exec($importCommand, $output);
				echo "done.\n\n";

				// TODO: load Craft instance and refresh caches and Asset indexes
				// 
				exit;
			}
		}
	}
}