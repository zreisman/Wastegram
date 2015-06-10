module ApplicationHelper

  BOOTSTRAP_FLASH_MSG = {
    success: 'alert-success',
    errors: 'alert-danger',
    alert: 'alert-warning',
    notice: 'alert-info'
  }

  def bootstrap_class_for(flash_type)
    BOOTSTRAP_FLASH_MSG.fetch(flash_type.to_sym)
  end

  def flash_messages(opts = {})
    content = ""
    flash.each do |msg_type, messages|
      messages.each do |message|
        content << "<li class=\"#{bootstrap_class_for(msg_type)}\"><h6>#{message}</h6></li>"
      end
    end
    return "<ul class=\"flash-message\">#{content}</ul>".html_safe
  end

  def render_auth_token
    tag = %{
      <input type=\"hidden\" name=\"authenticity_token\"
      value=\"#{form_authenticity_token}\">
    }
    tag.html_safe
  end


end
