@component('mail::message')
# Forget Password link



@component('mail::button', ['url' => $link])
forget password 
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
