var scrollUpDelay = 1;
var scrollUpSpeed = 30;

function scrollUp()
{
	if((document.body.scrollTop || document.documentElement.scrollTop) <1)
	{
		return;
	}
    document.body.scrollTop = document.body.scrollTop - scrollUpSpeed; // For Safari
    document.documentElement.scrollTop = document.documentElement.scrollTop - scrollUpSpeed; // For Chrome, Firefox, IE and Opera

	setTimeout('scrollUp()',scrollUpDelay);
}